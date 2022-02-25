import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../State/index";
import { bindActionCreators } from "redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import User from "./User";

const Likes = () => {
    const dispatch = useDispatch();
    const { getFollowersCount, getFollowingCount, clearFollowers, clearFollowing } =
        bindActionCreators(actionCreators, dispatch);
    const followers = useSelector(state => state.followers);
    const followings = useSelector(state => state.followings);
    const [likedUsers, setLikedUsers] = useState([]);
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("Favorite") || "[]");
        if (users) {
            clearFollowers();
            clearFollowing();
            users.forEach(user => {
                const userObj = JSON.parse(user);
                getFollowersCount(userObj.login); //action creators
                getFollowingCount(userObj.login);
            });
        }
        setLikedUsers(users);
    }, []);

    const fetchLikedUsers = () => {
        const secondColumnStart = Math.floor(likedUsers.length / 2);
        const col1Item = likedUsers.slice(0, secondColumnStart);
        const col2Item = likedUsers.slice(secondColumnStart);
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {col1Item.map((user, idx) => {
                            user = JSON.parse(user);
                            let tempFollower = followers.find(user2 => user2.login === user.login);
                            let tempFollowing = followings.find(
                                user2 => user2.login === user.login,
                            );
                            if (tempFollower && tempFollowing) {
                                return (
                                    <User
                                        key={idx}
                                        user={user}
                                        followers={tempFollower.followers}
                                        following={tempFollowing.following}
                                    />
                                );
                            }
                        })}
                    </Grid>
                    <Grid item xs={6}>
                        {col2Item.map((user, idx) => {
                            user = JSON.parse(user);
                            let tempFollower = followers.find(user2 => user2.login === user.login);
                            let tempFollowing = followings.find(
                                user2 => user2.login === user.login,
                            );
                            if (tempFollower && tempFollowing) {
                                return (
                                    <User
                                        key={idx}
                                        user={user}
                                        followers={tempFollower.followers}
                                        following={tempFollowing.following}
                                    />
                                );
                            }
                        })}
                    </Grid>
                </Grid>
            </Box>
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Favorite</h2>
            {fetchLikedUsers()}
        </div>
    );
};

export default Likes;
