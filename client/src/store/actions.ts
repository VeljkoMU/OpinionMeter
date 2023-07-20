import { createAction, props } from "@ngrx/store";
import { PagingData } from "src/app/models/paging-data";
import { Post } from "src/app/models/post";
import { User } from "src/app/models/user";


export const changePostsAction = createAction("Change Posts",
props<{posts:any}>());

export const changeUserPostsAction = createAction("Change User Posts",
props<{posts: any}>());

export const getPostsByTagAction = createAction("Get Posts By Tag",
props<{tag: string, pageNum: number}>());

export const getMostEngagedWithPostsAction = createAction("Get Posts By Engagement")

export const getpostsByUserAction = createAction("Get Posts By User",
props<{user: string}>());

export const changeCurrentPageAction = createAction("Change Page", 
props<{pagingData: PagingData}>());

export const getPageResults = createAction("Get Page Results",
props<{newPage: Number}>());

export const changeMostEngagedWithPostsAction = createAction("Change Engaged With",
props<{posts: Array<Post>}>());

export const changeUserAction = createAction("Change User With",
props<{user: User | undefined}>());