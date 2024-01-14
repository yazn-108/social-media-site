const UserId = (state = 0, action) => {
    if (action.type === "userId") {
        state = action.id
    }
    return state
}
export default UserId
