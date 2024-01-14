const LogInState = (state = false, action) => {
    if (action.type === "logInState") {
        state = action.state
    }
    return state
}
export default LogInState
