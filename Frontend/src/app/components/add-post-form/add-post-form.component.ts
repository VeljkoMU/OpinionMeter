import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {

  public postText:string = "";
  public tag:string = "";
  public link:string = "";
  public done:boolean = false;

  constructor(private userData: UserDataManagerService,
              private postService: PostServiceService) { }

  ngOnInit(): void {
    this.done=false;
  }

  public add(){
    let user: String = this.userData.username;

    this.postService.addPost(user, this.postText, this.link, this.tag).subscribe((res:any)=>{
      if(res.status){
        this.done = true;
      }
    });
  }

}
