import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post";


export const changePostsAction = createAction("Change Posts",
props<{posts:any}>());

export const changeUserPostsAction = createAction("Change User Posts",
props<{posts: any}>());

export const getPostsByTagAction = createAction("Get Posts By Tag",
props<{tag: string}>());

export const getpostsByUserAction = createAction("Get Posts By User",
props<{user: string}>());