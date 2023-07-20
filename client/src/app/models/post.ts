export interface Post{
    _id: string,
    user: String,
    approvals:  {
        [key: string]: string
    },
    disapprovals:  {
        [key: string]: string
    }
    ,
    comments: Array<any>,
    text: String,
    link: String,
    tag: String,
    interactionNum: Number,
    votedOnBy: []
}