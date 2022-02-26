const reducer = (state = 0, action) => {
    switch(action.type) {
        case "CURRENT_USER_DISPLAY":
            return action.payload
        default:
            return state
    }
}

export default reducer;