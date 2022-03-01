import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { UserAuthorizationComponent } from '../components/user-authorization/user-authorization.component';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { UserDataManagerService } from './user-data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private posts: Array<Post> = [];
  public postsObserver: Subject<Array<Post>> = new Subject<Array<Post>>();
  private currentTag:string = "general";

  constructor(private httpClient: HttpClient,
              private userService: UserDataManagerService) { }

  public getPostsByTag(tag: string){
    let ret = this.httpClient.get(`http://localhost:5500/getPostsByTag?tag=${tag}`);

    ret.subscribe((data: any)=>{
      this.posts = data;
      this.postsObserver.next(this.posts);
    });

    this.currentTag = tag;

    return ret;
  }
  public getPostsByUser(user: String){
      let ret = this.httpClient.get(`http://localhost:5500/getPostsFromuser?user=${user}`);

      ret.subscribe((data:any)=>{
        this.posts = data;
        this.postsObserver.next(this.posts);
      });

      return ret;
  }

  public ratePost(isPositive: boolean, id:string){
    return this.httpClient.post("http://localhost:5500/rate", {
      _id: id,
      isPositive: isPositive,
      username: this.userService.username
    });
  }

  public addComment(id: string, comment: Comment){
    console.log(comment);
    return this.httpClient.post("http://localhost:5500/addComment", {
      _id: id,
      user: comment.user,
      commentText: comment.commentText
    });
  }

  public addPost(user:String, text:string, link: string, tag:string){
    let ret = this.httpClient.post("http://localhost:5500/addPost", {
      user: user,
      post: text,
      tag: tag,
      link: link
    }, {observe: "response"});

    this.getPostsByTag(this.currentTag).subscribe((data: any)=>this.posts = data);
    return ret;
  }

  public deletePost(id:string){
    return this.httpClient.delete(`http://localhost:5500/deletePost?_id=${id}`, {observe: "response"});
  }

  public rateComment(cid: string, pid: string, isPositive: boolean){
    let user = this.userService.username;

    return this.httpClient.put(`http://localhost:5500/rateComment`, {
      user:user,
      postid: pid,
      commentid: cid,
      isPositive: isPositive
    });
  }
}
