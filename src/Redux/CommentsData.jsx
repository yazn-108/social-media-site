const CommentsData = (state = [], action) => {
    if (action.type === 'comments') {
        state = action.commentsData
        sessionStorage.setItem("post-comments", JSON.stringify(state))
    }
    return state
}
export default CommentsData