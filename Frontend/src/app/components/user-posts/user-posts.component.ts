import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UIService } from 'src/app/services/ui.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';

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
              private uiService: UIService) { }

  ngOnInit(): void {
    this.user = this.userData.username;
    this.postService.postsObserver.subscribe((data:any)=>{
      this.posts = data;
    });
    this.postService.getPostsByUser(this.user);
  }

  public back(){
    this.uiService.gotoMain();
  }

}
