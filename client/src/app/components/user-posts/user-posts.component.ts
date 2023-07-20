import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UIService } from 'src/app/services/ui.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import { getpostsByUserAction } from 'src/store/actions';
import { State } from 'src/store/app-state';
import { selectUserData, selectUserPosts } from 'src/store/selectors';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  public user: User|undefined;
  public posts: any = [];
  public postsText: String = "You have no posts"

  constructor(private postService: PostServiceService,
              private userData: UserDataManagerService,
              private uiService: UIService,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((data:any) => {
      this.user = {
        username: data.username,
        gender: data.gender,
        employment: data.employment,
        education: data.education,
        region: data.region
      }
    });
    this.store.select(selectUserPosts).subscribe((data:any)=>{
      this.posts = data;
      if(this.posts.length != 0) {
        this.postsText = "My Posts";
      }
    });
    this.store.dispatch(getpostsByUserAction({user: this.user?.username ?? ""}));
  }

  public logout() {
    this.userData.logout().subscribe((response: any) => {
      if(response.status) {
        this.uiService.gotoLogin();
      }
    });
  }

  public back(){
    this.uiService.gotoMain();
  }

}
