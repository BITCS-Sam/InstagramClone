import { USERS } from "./users";

export const POSTS = [
    {
        id: 1,
        name: USERS[0].name,
        imageURL: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
        likes: 7870,
        caption: "This is a caption",
        postedAt: "6 hours ago",
        profilePicture: USERS[0].imageUri,
        comments: [
            {
                user: "randmo1",
                comment: "This is a comment"
            },
            {
                user: "asdeter",
                comment: "This is a comment"
            }
        ]
    },
    {
        id: 2,
        name: USERS[1].name,
        imageURL: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
        likes: 7870,
        caption: "This is a caption",
        postedAt: "6 hours ago",
        profilePicture: USERS[1].imageUri,
        comments: [
            {
                user: "randmo1",
                comment: "This is a comment"
            },
        ]
    },
    {
        id: 3,
        name: USERS[0].name,
        imageURL: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
        likes: 7870,
        caption: "This is a caption",
        postedAt: "6 hours ago",
        profilePicture: USERS[0].imageUri,
        comments: [
        ]
    },

]