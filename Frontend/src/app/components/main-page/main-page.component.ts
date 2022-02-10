import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public posts: Array<Post>= [];

  constructor(private postService: PostServiceService,
              private uiService: UIService) { }

  ngOnInit(): void {
    this.postService.postsObserver.subscribe((data:any)=>{
      this.posts = data;
      console.log(this.posts);
    });
    this.postService.getPostsByTag("general");
  }

  public getByTag(tag:string){
    this.postService.getPostsByTag(tag);
  }

  public myposts(){
    this.uiService.gotoUser();
  }

}
