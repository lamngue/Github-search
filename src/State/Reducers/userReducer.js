const reducer = (state = [], action) => {
    let newState;
    switch(action.type) {
        case "FETCH_USERS":
            newState = action.payload;
            return newState
        case "FETCH_ONE_USER":
            newState = action.payload;
            return newState;
        case "FETCH_ONE_USER_REPOS":
        case "FETCH_ONE_USER_FOLLOWERS":
        case "FETCH_ONE_USER_FOLLOWING":
            newState = {...state}
            let name = '';
            if (action.type === 'FETCH_ONE_USER_REPOS') {
                name = 'repos'
            } else if (action.type === 'FETCH_ONE_USER_FOLLOWERS') {
                name = 'followers_users'
            } else if (action.type === "FETCH_ONE_USER_FOLLOWING") {
                name = 'following_users'
            }
            newState[name] = action.payload;
            return newState
        default:
            return state
    }
}

export default reducer;