import { createSelector} from "@ngrx/store";
import { State } from "./app-state";
import { AppState } from "./reducers";


export const postsSelector = (state: State)=> {
return state.appState;
}

export const selectLoadedPosts = createSelector(postsSelector, (state: AppState)=>{
    return state.loadedPosts;
});

export const selectUserPosts = createSelector(postsSelector, (state: AppState)=>{
    return state.userPosts;
});