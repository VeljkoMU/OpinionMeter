export interface Comment{
    _id: string,
    user: String,
    commentText: string,
    upvoteCounter: number,
    downvoteCounter:number,
    votedOnBy: []
}