import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PostServiceService } from "src/app/services/post-service.service";
import { UserDataManagerService } from "src/app/services/user-data-manager.service";
import { changeCurrentPageAction, changeMostEngagedWithPostsAction, changePostsAction, changeUserPostsAction, getMostEngagedWithPostsAction, getPageResults, getPostsByTagAction, getpostsByUserAction } from "./actions";

@Injectable()
export class AppEffects{
    constructor(
        private userDataService: UserDataManagerService,
        private postsService: PostServiceService,
        private actions$:Actions 
    ){
        console.log("postojim!");
    }

      loadPostsEffect$ = createEffect(()=>{
        return this.actions$.pipe(
        ofType(getPostsByTagAction),
        mergeMap((request: {tag: string, pageNum: number})=>this.postsService.getPostsByTag(request.tag, request.pageNum).pipe(
            map((posts: any)=>changePostsAction({posts}))
        ))
    )}, {dispatch: true});

    loadUserPostsEffect$ = createEffect(()=>this.actions$.pipe(
        ofType(getpostsByUserAction),
        mergeMap((user: {user:string})=>this.postsService.getPostsByUser(user.user).pipe(
            map((posts: any)=>changeUserPostsAction({posts})
        )))), {dispatch: true});

    loadMostEngagedWithposts$ = createEffect(() => this.actions$.pipe(
        ofType(getMostEngagedWithPostsAction),
        mergeMap(() => 
            this.postsService.getMostEngagedWithPosts().pipe(
                map((posts: any) => changeMostEngagedWithPostsAction({posts})))
    
            ))
    , {dispatch: true})

    changeCurrentPage$ = createEffect(() => this.actions$.pipe(
        ofType(getPageResults),
        mergeMap((pageNum: {newPage: Number}) => this.postsService.getPostsByTag(this.postsService.currentTag, pageNum.newPage as number)
        .pipe(
            map((posts: any) => changePostsAction({posts}))
        ))
    ))
}