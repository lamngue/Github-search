const reducer = (state = 1, action) => {
    switch(action.type) {
        case "PAGE_FOLLOWERS":
            return action.payload
        default:
            return state
    }
}

export default reducer;