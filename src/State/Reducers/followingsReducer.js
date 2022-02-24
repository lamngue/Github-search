const reducer = (state = [], action) => {
    switch(action.type) {
        case "GET_FOLLOWINGS_COUNT":
            const newState = [...state, action.payload]
            return newState
        case "CLEAR_FOLLOWING":
            return action.payload
        default:
            return state
    }
}

export default reducer;