const reducer = (state = [], action) => {
    let newState = [];
    switch (action.type) {
        case "GET_FOLLOWINGS_COUNT":
            const newUser = { login: action.payload.login, following: action.payload.following };
            newState = [...state, newUser];
            return newState;
        case "CLEAR_FOLLOWING":
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
