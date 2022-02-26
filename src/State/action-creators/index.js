import axios from "axios";

const getAxiosInstance = () => {
    return axios.create({
        baseURL: "https://api.github.com/",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `token ${process.env.REACT_APP_PRIVATE_GITHUB_TOKEN}`,
        },
    });
};

export const setUsers = users => ({
    type: "SET_USERS",
    payload: users,
});

export const fetchUser = (searchTerm, page = 1, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(
            `search/users?q=${searchTerm}&page=${page}&per_page=12`,
            {
                headers: { ...extraHeaders },
            },
        );
        dispatch(setUsers(results.data));
    };
};

export const getOneUser = (username, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(`/users/${username}`, {
            headers: { ...extraHeaders },
        });
        dispatch({
            type: "FETCH_ONE_USER",
            payload: results.data,
        });
    };
};

export const getOneUserRepos = (username, page = 1, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(`/users/${username}/repos?page=${page}`, {
            headers: { ...extraHeaders },
        });
        dispatch({
            type: "FETCH_ONE_USER_REPOS",
            payload: results.data,
        });
    };
};

export const getOneUserFollowers = (username, page = 1, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(`/users/${username}/followers?page=${page}`, {
            headers: { ...extraHeaders },
        });
        dispatch({
            type: "FETCH_ONE_USER_FOLLOWERS",
            payload: results.data,
        });
    };
};

export const getOneUserFollowing = (username, page = 1, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(`/users/${username}/following?page=${page}`, {
            headers: { ...extraHeaders },
        });
        dispatch({
            type: "FETCH_ONE_USER_FOLLOWING",
            payload: results.data,
        });
    };
};

export const setSearchTerm = searchTerm => {
    return dispatch => {
        dispatch({
            type: "SEARCH",
            payload: searchTerm,
        });
    };
};

export const setPageUsers = page => {
    return dispatch => {
        dispatch({
            type: "PAGE_USERS",
            payload: page,
        });
    };
};

export const setPageRepos = page => {
    return dispatch => {
        dispatch({
            type: "PAGE_REPOS",
            payload: page,
        });
    };
};

export const setPageFollowers = page => {
    return dispatch => {
        dispatch({
            type: "PAGE_FOLLOWERS",
            payload: page,
        });
    };
};

export const setPageFollowing = page => {
    return dispatch => {
        dispatch({
            type: "PAGE_FOLLOWING",
            payload: page,
        });
    };
};

export const setCurrentUserDisplay = display => {
    return dispatch => {
        dispatch({
            type: "CURRENT_USER_DISPLAY",
            payload: display,
        });
    };
};

export const getFollowersCount = (username, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(`users/${username}`, {
            headers: { ...extraHeaders },
        });
        dispatch({
            type: "GET_FOLLOWERS_COUNT",
            payload: results.data,
        });
    };
};
export const getFollowingCount = (username, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(`users/${username}`, {
            headers: { ...extraHeaders },
        });
        dispatch({
            type: "GET_FOLLOWINGS_COUNT",
            payload: results.data,
        });
    };
};

export const clearFollowers = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_FOLLOWERS",
            payload: [],
        });
    };
};

export const clearFollowing = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_FOLLOWING",
            payload: [],
        });
    };
};
