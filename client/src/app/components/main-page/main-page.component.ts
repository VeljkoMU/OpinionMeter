import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, single, take } from 'rxjs';
import { PagingData } from 'src/app/models/paging-data';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UIService } from 'src/app/services/ui.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import { getMostEngagedWithPostsAction, getPostsByTagAction } from 'src/store/actions';
import { State } from 'src/store/app-state';
import { AppState } from 'src/store/reducers';
import { selectCurrentPageNum, selectLoadedPosts, selectMostEngagedWithPosts, selectUserData } from 'src/store/selectors';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  personBooth = faSignInAlt;
  hamburgerIcon = faGripLines;

  public posts: Array<Post> | undefined= [];
  public addPostDialogVisible: boolean = false;
  public username: String = "";
  public currentPage: number = 1;
  public currentTag: String = "general";
  public accountNavigationString = "Login / Register";
  public backgroundImageUri: String = "";
  public isMenuOpen: boolean = false;

  constructor(private store: Store<State>,
              private uiService: UIService,
              private userData: UserDataManagerService) { }

  ngOnInit(): void {
    this.store.select(selectCurrentPageNum).subscribe((pagingData: PagingData) => {
      this.currentPage = pagingData.currentPage
    });
    this.store.select(selectLoadedPosts).subscribe((posts)=>{
      this.posts=posts;
      this.changeBackground(this.currentTag);
    });
    this.store.select(selectUserData).subscribe((userData: User|undefined) => {
      this.username = userData?.username ?? "";
      if(this.username != "") {
        this.accountNavigationString = "My Account";
      }
      else {
        this.userData.confirmCradentials();
      }
    });
   this.store.dispatch(getPostsByTagAction({tag: "general", pageNum: 1}));
   if(this.username == undefined) {
    this.userData.confirmCradentials();
   }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private changeBackground(selectedTag: String) {
      this.backgroundImageUri = "assets/" + selectedTag + ".jpg";
      if(this.currentTag == ""){
        this.backgroundImageUri = "assets/general.jpg";
      }
  }

  public getByTag(tag:string){
    this.currentTag = tag;
    this.store.dispatch(getPostsByTagAction({tag, pageNum: 1}));
  }

  public getMostEngagingPosts() {
    this.currentTag = "";
    this.store.dispatch(getMostEngagedWithPostsAction())
    this.store.select(selectMostEngagedWithPosts).pipe(take(1)).subscribe((data: Array<Post>) => {
        this.posts = data;
    }
    )
  }

  public myposts(){
    if(this.userData.username != "")
      this.uiService.gotoUser();
    else
      this.uiService.gotoLogin();
  }

  public setAddPostDialogVisibility(isVisible: boolean) {
    this.addPostDialogVisible = isVisible;
  }
}
