import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import { UserAuthorizationComponent } from '../user-authorization/user-authorization.component';
import { OpinionStatus } from 'src/app/models/opinion-status';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { State } from 'src/store/app-state';
import { selectUserData } from 'src/store/selectors';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations:[
    //state("void",style({opacity: 1})),
    trigger("change-view", [
      transition("void => *", [
        style({opacity: 0}),
        animate("300ms ease")
      ])
    ])
  ]
})
export class PostComponent implements OnInit {
  faThumbUp = faThumbsUp
  faThumbsDown = faThumbsDown

  @Input() public post: Post|undefined;
  public localComment: string = "";
  public postText: string = "";
  public notVoted: boolean = true;
  public approvals: number = 0;
  public dissapprovals: number = 0;
  public statistics: boolean = false;
  public mostApporvedProfile: string = "";
  public mostDisagreedProfile: string = "";
  public opinionStatus: OpinionStatus|undefined = undefined;
  @Input() public userControlMode: Boolean = false;
  @Input() public showIcons: boolean = true;
  @Input() public isUserSignedIn: boolean = false;
  @Input() public shouldUseElps: boolean = false;

  constructor(private postServise: PostServiceService,
              private userData: UserDataManagerService,
              private store: Store<State>) { }

  ngOnInit(): void {
    if(this.post){
    this.approvals = parseInt(this.post.approvals['overall']);
    this.dissapprovals = parseInt(this.post.disapprovals['overall']);

    this.post.comments.sort((a,b)=>a.upvoteCounter-b.upvoteCounter);
    this.store.select(selectUserData).subscribe((data: User|undefined)=>{
      if(data != undefined) {
        if(this.post?.votedOnBy.find(el=>el===this.userData.username))
           this.notVoted=false;
      }
    });
    if(this.post.votedOnBy.find(el=>el===this.userData.username))
        this.notVoted=false;

        this.calculateAudienceProfiles();

        if(this.shouldUseElps) {
          this.postText = this.post.text.slice(0, 150)+"...";
        }
        else {
          this.postText = this.post.text.toString();
        }
  }
}

  public like(){
    if(this.post){
    //  this.post.approvals= this.post.approvals + 1;
      this.postServise.ratePost(true, this.post._id).subscribe(()=>{});
      this.notVoted = false;
      this.opinionStatus = OpinionStatus.isLiked;
    }
  }

  public dislike(){
    if(this.post){
    //  this.post.disapprovals= this.post.disapprovals + 1;
      this.postServise.ratePost(false, this.post._id).subscribe(()=>{});
      this.notVoted = false;
      this.opinionStatus = OpinionStatus.isDisliked;
      }
    }

    public addComment(){
      let comment: Comment = {
        _id: "",
        commentText: this.localComment,
        user: this.userData.username,
        upvoteCounter: 0,
        downvoteCounter: 0,
        votedOnBy: []
      }
      if(this.post){
        this.localComment = ""
       // this.post.comments.push(comment);
        this.postServise.addComment(this.post._id, comment).subscribe(()=>{});
      }
    }

    public rateComment(eventArg: any){
      if(this.post)
        this.postServise.rateComment(eventArg.id, this.post?._id, eventArg.isPositive).subscribe(()=>{});
    }

    public calculateAudienceProfiles(){
      if(!this.post){
        return;
      }

      //By gender
        if(this.post.approvals['male']>this.post.approvals['female'])
          this.mostApporvedProfile += "Male"
        else
          this.mostApporvedProfile +="Female"

        if(this.post.disapprovals['male']>this.post.disapprovals['female'])
          this.mostDisagreedProfile += "Male"
        else
          this.mostDisagreedProfile +="Female"

      //By education

      let educationAsocArray: {[key:string]: any}={
        "No Formal Education":  this.post.approvals['littlenone'],
        "Highschool Degreen": this.post.approvals['highschool'],
        "Bachelors Degree": this.post.approvals['bachelors'],
        "Masters Degree": this.post.approvals['masters'],
        "PhD": this.post.approvals['phd']
      }
      
      let keys = Object.keys(educationAsocArray);
      keys.sort((a,b)=>educationAsocArray[a]-educationAsocArray[b]);
      let top = keys[keys.length-1];

      this.mostApporvedProfile+= " " + top;

      educationAsocArray={
        "No Formal Education":  this.post.disapprovals['littlenone'],
        "Highschool Degreen": this.post.disapprovals['highschool'],
        "Bachelors Degree": this.post.disapprovals['bachelors'],
        "Masters Degree": this.post.disapprovals['masters'],
        "PhD": this.post.disapprovals['phd']
      }      
      
      keys = Object.keys(educationAsocArray);
      keys.sort((a,b)=>educationAsocArray[a]-educationAsocArray[b]);
      top = keys[keys.length-1];
      this.mostDisagreedProfile+= " " + top;

      //By employment

      let employmentAsocArray: {[key: string]: any} = {
        "Uemployed": this.post.approvals['unemployed'],
        "Employed": this.post.approvals['employed'],
        "Part Time Job": this.post.approvals['parttime'],
        "Self-Employed/Entrepreneur": this.post.approvals['entrepreneur']
      }

      keys = Object.keys(employmentAsocArray);
      keys.sort((a,b)=>employmentAsocArray[a]-employmentAsocArray[b]);
      top = keys[keys.length-1];

      this.mostApporvedProfile+= " " + top;

      employmentAsocArray= {
        "Uemployed": this.post.disapprovals['unemployed'],
        "Employed": this.post.disapprovals['employed'],
        "Part Time Job": this.post.disapprovals['parttime'],
        "Self-Employed/Entrepreneur": this.post.disapprovals['entrepreneur']
      }

      keys = Object.keys(employmentAsocArray);
      keys.sort((a,b)=>employmentAsocArray[a]-employmentAsocArray[b]);
      top = keys[keys.length-1];

      this.mostDisagreedProfile+= " " + top;

      //By region

      let regionAsocArray: {[key: string]: any}={
        "From Europe": this.post.approvals['europe'],
        "From The Middle East": this.post.approvals['middleeast'],
        "From Africa": this.post.approvals['africa'],
        "From East Asia": this.post.approvals['eastasia'],
        "From North America": this.post.approvals['namerica'],
        "From Latin America": this.post.approvals['samerica']
      }
      keys = Object.keys(regionAsocArray);
      keys.sort((a,b)=>regionAsocArray[a]-regionAsocArray[b]);
      top = keys[keys.length-1];

      this.mostApporvedProfile+= " " + top;

      regionAsocArray={
        "From Europe": this.post.disapprovals['europe'],
        "From The Middle East": this.post.disapprovals['middleeast'],
        "From Africa": this.post.disapprovals['africa'],
        "From East Asia": this.post.disapprovals['eastasia'],
        "From North America": this.post.disapprovals['namerica'],
        "From Latin America": this.post.disapprovals['samerica']
      }
      keys = Object.keys(regionAsocArray);
      keys.sort((a,b)=>regionAsocArray[a]-regionAsocArray[b]);
      top = keys[keys.length-1];

      this.mostDisagreedProfile+= " " + top;
    }

    public changeView(gotoStatistics: boolean){
      this.statistics=gotoStatistics;
    }
}
