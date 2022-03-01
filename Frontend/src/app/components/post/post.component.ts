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
  public approvals: number = 0;
  public dissapprovals: number = 0;
  public statistics: boolean = false;
  public mostApporvedProfile: string = "";
  public mostDisagreedProfile: string = "";

  constructor(private postServise: PostServiceService,
              private userData: UserDataManagerService) { }

  ngOnInit(): void {
    if(this.post){
    this.approvals = parseInt(this.post.approvals['overall']);
    this.dissapprovals = parseInt(this.post.disapprovals['overall']);

    this.post.comments.sort((a,b)=>a.upvoteCounter-b.upvoteCounter);
    if(this.post.votedOnBy.find(el=>el===this.userData.username))
        this.notVoted=false;

        this.calculateAudienceProfiles();
  }
}

  public like(){
    if(this.post){
    //  this.post.approvals= this.post.approvals + 1;
      this.postServise.ratePost(true, this.post._id).subscribe(()=>{});
      this.notVoted = false;
    }
  }

  public dislike(){
    if(this.post){
    //  this.post.disapprovals= this.post.disapprovals + 1;
      this.postServise.ratePost(false, this.post._id).subscribe(()=>{});
      this.notVoted = false;
      }
    }

    public addComment(){
      let comment: Comment = {
        _id: "",
        commentText: this.localComment,
        user: this.userData.username,
        upvoteCounter: 0,
        downvoteCounter: 0
      }
      if(this.post){
        this.post.comments.push(comment);
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
      let top = keys.splice(0,1);

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
      top = keys.splice(0,1);

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
      top = keys.splice(0,1);

      this.mostApporvedProfile+= " " + top;

      employmentAsocArray= {
        "Uemployed": this.post.disapprovals['unemployed'],
        "Employed": this.post.disapprovals['employed'],
        "Part Time Job": this.post.disapprovals['parttime'],
        "Self-Employed/Entrepreneur": this.post.disapprovals['entrepreneur']
      }

      keys = Object.keys(employmentAsocArray);
      keys.sort((a,b)=>employmentAsocArray[a]-employmentAsocArray[b]);
      top = keys.splice(0,1);

      this.mostDisagreedProfile+= " " + top;

      //By region

      let regionAsocArray: {[key: string]: any}={
        "From Europe": this.post.approvals['europe'],
        "From The Middle East": this.post.approvals['middleeast'],
        "From Africa": this.post.approvals['africa'],
        "From East Asia": this.post.approvals['fareast'],
        "From North America": this.post.approvals['namerica'],
        "From Latin America": this.post.approvals['samerica']
      }
      keys = Object.keys(regionAsocArray);
      keys.sort((a,b)=>regionAsocArray[a]-regionAsocArray[b]);
      top = keys.splice(0,1);

      this.mostApporvedProfile+= " " + top;

      regionAsocArray={
        "From Europe": this.post.disapprovals['europe'],
        "From The Middle East": this.post.disapprovals['middleeast'],
        "From Africa": this.post.disapprovals['africa'],
        "From East Asia": this.post.disapprovals['fareast'],
        "From North America": this.post.disapprovals['namerica'],
        "From Latin America": this.post.disapprovals['samerica']
      }
      keys = Object.keys(regionAsocArray);
      keys.sort((a,b)=>regionAsocArray[a]-regionAsocArray[b]);
      top = keys.splice(0,1);

      this.mostDisagreedProfile+= " " + top;
    }

    public changeView(gotoStatistics: boolean){
      this.statistics=gotoStatistics;
    }
}
