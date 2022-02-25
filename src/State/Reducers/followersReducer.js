const reducer = (state = [], action) => {
    let newState = [];
    switch (action.type) {
        case "GET_FOLLOWERS_COUNT":
            const newUser = { login: action.payload.login, followers: action.payload.followers };
            newState = [...state, newUser];
            return newState;
        case "CLEAR_FOLLOWERS":
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
