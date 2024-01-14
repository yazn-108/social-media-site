const PostsData = (state = [], action) => {
    if (action.type === "posts") {
        state = action.data
    }
    return state
}
export default PostsData
