import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer, shareReplay, Subject } from 'rxjs';
import { UserAuthorizationComponent } from '../components/user-authorization/user-authorization.component';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { UserDataManagerService } from './user-data-manager.service';
import { Store } from '@ngrx/store';
import { State } from 'src/store/app-state';
import { changeCurrentPageAction } from 'src/store/actions';
import { PagingData } from '../models/paging-data';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private posts: Array<Post> = [];
  public postsObserver: Subject<Array<Post>> = new Subject<Array<Post>>();
  public currentTag:string = "general";
  public pageNum: number = 1;

  constructor(private httpClient: HttpClient,
              private userService: UserDataManagerService,
              private store: Store<State>) {
               }

  public getPostsByTag(tag: string, pageNum: number){
    let ret = this.httpClient.get(`/posts/getPostsByTag?tag=${tag}&pageNum=${pageNum}`, {
      withCredentials: false
    }).pipe(
      shareReplay(1)
    );

    ret.subscribe((data: any)=>{
      this.posts = data.docs;
      this.pageNum = data.currentPage;
      this.postsObserver.next(this.posts);
      const pageingData =  {
        currentPage: data.currentPage,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage
      }
    this.store.dispatch(changeCurrentPageAction({pagingData: pageingData}))
    });

    this.currentTag = tag;

    return ret;
  }
  public getPostsByUser(user: String){
      let ret = this.httpClient.get(`/posts/getPostsFromuser?user=${user}`, {withCredentials: true}).pipe(
        shareReplay(1)
      );

      ret.subscribe((data:any)=>{
        this.posts = data;
        this.postsObserver.next(this.posts);
      });

      return ret;
  }

  public ratePost(isPositive: boolean, id:string){
    return this.httpClient.post("/posts/rate", {
      _id: id,
      isPositive: isPositive,
      username: this.userService.username
    }, {
      withCredentials: true
    });
  }

  public addComment(id: string, comment: Comment){
    return this.httpClient.post("/posts/addComment", {
      _id: id,
      user: comment.user,
      commentText: comment.commentText
    }, {withCredentials: true});
  }

  public getMostEngagedWithPosts() {
    const posts = this.httpClient.get("/posts/mostEngagedWith", {withCredentials: false}).pipe(
      shareReplay(1)
    );

    return posts;
  }
  
  public addPost(user:String, text:string, link: string, tag:string){
    let ret = this.httpClient.post("/posts/addPost", {
      user: user,
      post: text,
      tag: tag,
      link: link
    }, {observe: "response", withCredentials: true});

    this.getPostsByTag(this.currentTag, this.pageNum).subscribe((data: any)=>this.posts = data);
    return ret;
  }

  public deletePost(id:string){
    return this.httpClient.delete(`/posts/deletePost?_id=${id}`, {observe: "response", withCredentials: true});
  }

  public rateComment(cid: string, pid: string, isPositive: boolean){
    let user = this.userService.username;

    return this.httpClient.put(`/posts/rateComment`, {
      user:user,
      postid: pid,
      commentid: cid,
      isPositive: isPositive
    });
  }
}
