import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import { UserAuthorizationComponent } from '../user-authorization/user-authorization.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() public post: Post|undefined;
  public localComment: string = "";
  public notVoted: boolean = true;

  constructor(private postServise: PostServiceService,
              private userData: UserDataManagerService) { }

  ngOnInit(): void {
  }

  public like(){
    if(this.post){
      this.post.approvals= this.post.approvals + 1;
      this.postServise.ratePost(true, this.post._id).subscribe(()=>{});
      this.notVoted = false;
    }
  }

  public dislike(){
    if(this.post){
      this.post.disapprovals= this.post.disapprovals + 1;
      this.postServise.ratePost(false, this.post._id).subscribe(()=>{});
      this.notVoted = false;
      }
    }

    public addComment(){
      let comment: Comment = {
        commentText: this.localComment,
        user: this.userData.username
      }
      if(this.post){
        this.post.comments.push(comment);
        this.postServise.addComment(this.post._id, comment).subscribe(()=>{});
      }
    }

}
