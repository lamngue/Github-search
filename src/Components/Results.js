import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import User from './User';
import { actionCreators } from "../State/index";
const Results = () => {
    const users = useSelector((state) => state.users);
    const searchTerm = useSelector((state) => state.searchTerm);
    const pageUsers = useSelector((state) => state.pageUsers);
    const followers = useSelector((state) => state.followers);
    const followings = useSelector((state) => state.followings);
    const dispatch = useDispatch()
    const { fetchUser, setPageUsers, getFollowersCount, getFollowingCount, clearFollowers, clearFollowing } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        clearFollowers();
        clearFollowing();
        if (users.items) {
            users.items.forEach(user => {
                getFollowersCount(user.login); //action creators
                getFollowingCount(user.login);
            });
        }
    }, [users]);

    const handleChange = (e, value) => {
        //set current page
        setPageUsers(value);
        clearFollowers();
        clearFollowing();
        fetchUser(searchTerm, value);
    }

    const renderUsers = () => {
        let secondColumnStart = 0;

        if (!users.items) return;
        secondColumnStart = Math.floor(users.items.length / 2);
        const col1Item = users.items.slice(0, secondColumnStart);
        const col2Item = users.items.slice(secondColumnStart);
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {col1Item.map((user, idx) => {
                            return <User followers={followers[idx*2]} following={followings[idx*2]} user={user} />
                        })}
                    </Grid>
                    <Grid item xs={6}>
                        {col2Item.map((user, idx) => {
                            return <User followers={followers[idx*2+1]} following={followings[idx*2+1]} user={user} />
                        })}
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Results</h2>
            <h5>{users.total_count} GitHub users found</h5>
            {renderUsers()}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination sx={{ padding: '20px' }} count={10} page={pageUsers} onChange={handleChange} />
            </div>
        </div>
    )
}

export default Results;