import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PostServiceService } from "src/app/services/post-service.service";
import { UserDataManagerService } from "src/app/services/user-data-manager.service";
import { changePostsAction, changeUserPostsAction, getPostsByTagAction, getpostsByUserAction } from "./actions";

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
        mergeMap((tag: {tag: string})=>this.postsService.getPostsByTag(tag.tag).pipe(
            map((posts: any)=>changePostsAction({posts}))
        ))
    )}, {dispatch: true});

    loadUserPostsEffect$ = createEffect(()=>this.actions$.pipe(
        ofType(getpostsByUserAction),
        mergeMap((user: {user:string})=>this.postsService.getPostsByUser(user.user).pipe(
            map((posts: any)=>changeUserPostsAction({posts})
        )))), {dispatch: true});
}