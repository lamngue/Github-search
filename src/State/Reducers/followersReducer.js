const reducer = (state = [], action) => {
    switch(action.type) {
        case "GET_FOLLOWERS_COUNT":
            const newState = [...state, action.payload]
            return newState
        case "CLEAR_FOLLOWERS":
            return action.payload
        default:
            return state
    }
}

export default reducer;