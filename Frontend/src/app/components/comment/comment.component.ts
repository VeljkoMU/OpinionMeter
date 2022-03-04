import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';


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
    downvoteCounter: 0,
    votedOnBy: []
  }

  @Output() public voteOnComment: EventEmitter<{id: string, isPositive: boolean}> = new EventEmitter();

  public voted: boolean = false;

  constructor(private userData: UserDataManagerService) { }

  ngOnInit(): void {
    if(this.comment.votedOnBy.find(el=> el===this.userData.username))
      this.voted=true;
  }

  public vote(isPositive: boolean){
      this.voteOnComment.emit({id: this.comment._id, isPositive});
      this.voted = true;
  }

}
