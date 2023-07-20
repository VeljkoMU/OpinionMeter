import { Post } from "src/app/models/post";
import {createReducer, on} from '@ngrx/store'
import {changeCurrentPageAction, changeMostEngagedWithPostsAction, changePostsAction, changeUserAction, changeUserPostsAction } from "./actions";
import { PagingData } from "src/app/models/paging-data";
import { User } from "src/app/models/user";


export interface AppState{
    loadedPosts: Array<Post>,
    userPosts: Array<Post>,
    pagingData: PagingData,
    mostEngaged: Array<Post>,
    userData: User|undefined
}

export const initialState: AppState = {
    loadedPosts: [],
    userPosts: [],
    userData: undefined,
    pagingData: {
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false
    },
    mostEngaged: []
}

export const postsReducer = createReducer(initialState,
       on(changePostsAction, (state, {posts})=>{
           return {...state, loadedPosts: posts.docs}
       }),
       on(changeUserPostsAction, (state, {posts})=>{
           return {...state, userPosts: posts}
       }),
       on(changeCurrentPageAction, (state, {pagingData}) => {
        return {...state, pagingData: pagingData}
       }),
       on(changeMostEngagedWithPostsAction, (state, {posts}) => {
        return {...state, mostEngaged: posts}
       }),
       on(changeUserAction, (state, {user}) => {
        return {...state, userData: user}
       })
    );