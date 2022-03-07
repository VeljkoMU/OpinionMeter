import { Post } from "src/app/models/post";
import {createReducer, on} from '@ngrx/store'
import { changePostsAction, changeUserPostsAction } from "./actions";


export interface AppState{
    loadedPosts: Array<Post>,
    userPosts: Array<Post>
}

export const initialState: AppState = {
    loadedPosts: [],
    userPosts: []
}

export const postsReducer = createReducer(initialState,
       on(changePostsAction, (state, {posts})=>{
           return {...state, loadedPosts: posts}
       }),
       on(changeUserPostsAction, (state, {posts})=>{
           return {...state, userPosts: posts}
       }),
       
    );