import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pageUsersReducer from "./pageUsersReducer";
import pageReposReducer from "./pageReposReducer";
import pageFollowersReducer from "./pageFollowersReducer";
import pageFollowingReducer from "./pageFollowingReducer";
import searchTermReducer from "./searchTermReducer";
import followersReducer from "./followersReducer";
import followingsReducer from "./followingsReducer";
import currentUserDisplayReducer from "./currentUserDisplayReducer";

const reducers = combineReducers({
    currentDisplay: currentUserDisplayReducer,
    pageUsers: pageUsersReducer,
    pageRepos: pageReposReducer,
    pageFollowers: pageFollowersReducer,
    pageFollowing: pageFollowingReducer,
    users: userReducer,
    followers: followersReducer,
    followings: followingsReducer,
    searchTerm: searchTermReducer,
});

export default reducers;
