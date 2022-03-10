import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UIService } from 'src/app/services/ui.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import { getpostsByUserAction } from 'src/store/actions';
import { State } from 'src/store/app-state';
import { selectUserPosts } from 'src/store/selectors';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  public user: String = "";
  public posts: any = [];

  constructor(private postService: PostServiceService,
              private userData: UserDataManagerService,
              private uiService: UIService,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.user = this.userData.username;
    this.store.select(selectUserPosts).subscribe((data:any)=>{
      this.posts = data;
    });
    this.store.dispatch(getpostsByUserAction({user: this.user.toString()}));
  }

  public back(){
    this.uiService.gotoMain();
  }

}
