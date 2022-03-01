import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() public comment: Comment ={
    _id:"",
    commentText: "",
    user: "",
    upvoteCounter: 0,
    downvoteCounter: 0
  }

  @Output() public voteOnComment: EventEmitter<{id: string, isPositive: boolean}> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public vote(isPositive: boolean){
      this.voteOnComment.emit({id: this.comment._id, isPositive});
  }

}
