export interface Post{
    _id: string,
    user: String,
    approvals: number,
    disapprovals: number,
    comments: Array<any>,
    text: String,
    link: String,
    tag: String
}