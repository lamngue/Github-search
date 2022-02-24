import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from "../State/index";
import { bindActionCreators } from 'redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import User from './User';
import Repos from './Repos';
import "../CSS/style.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile = () => {
    const user = useSelector((state) => state.users);
    const currentDisplay = useSelector((state) => state.currentDisplay);
    const pageRepos = useSelector((state) => state.pageRepos);
    const pageFollowers = useSelector((state) => state.pageFollowers);
    const pageFollowing = useSelector((state) => state.pageFollowing);
    const userFollowers = useSelector((state) => state.followers);
    const userFollowing = useSelector((state) => state.followings)
    const { username } = useParams();
    const dispatch = useDispatch();
    const { getOneUser,
        getOneUserRepos,
        getOneUserFollowers,
        getOneUserFollowing,
        setCurrentUserDisplay,
        setPageRepos,
        setPageFollowers,
        setPageFollowing,
        getFollowersCount,
        getFollowingCount,
        clearFollowers,
        clearFollowing
    } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        clearFollowers();
        clearFollowing();
        getOneUser(username);
        handleChangeDisplay(null, currentDisplay);
        if (user['followers_users']) {
            user['followers_users'].forEach(user => {
                getFollowersCount(user.login); //action creators
                getFollowingCount(user.login);
            });
        }
        if (user['following_users']) {
            user['following_users'].forEach(user => {
                getFollowersCount(user.login); //action creators
                getFollowingCount(user.login);
            });
        }
    }, [currentDisplay]);

    const handleChangeDisplay = (event, value) => {
        setCurrentUserDisplay(value);
        if (value === 0) {
            getOneUserRepos(username);
        } else if (value === 1) {
            getOneUserFollowers(username);
        } else if (value === 2) {
            getOneUserFollowing(username);
        }
    }

    const handleChangePageRepo = (event, value) => {
        setPageRepos(value);
        getOneUserRepos(username, value);
    }

    const handleChangePageFollowers = (event, value) => {
        setPageFollowers(value);
        getOneUserFollowers(username, value);
    }

    const handleChangePageFollowing = (event, value) => {
        setPageFollowing(value);
        getOneUserFollowing(username, value);
    }

    const renderDisplay = (data, type) => {
        let secondColumnStart = 0;
        if (!data.length) return;
        secondColumnStart = Math.floor(data.length / 2);
        const col1Item = data.slice(0, secondColumnStart);
        const col2Item = data.slice(secondColumnStart);
        console.log("Users followers: ", userFollowers);
        console.log("Users following: ", userFollowing);
        if (!userFollowers || !userFollowing) return
        if (type === 'users') {
            return (
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {col1Item.map((user, idx) => {
                            return <User from="Profile" followers={userFollowers[idx*2]} following={userFollowing[idx*2]} user={user} />
                        })}
                    </Grid>
                    <Grid item xs={6}>
                        {col2Item.map((user, idx) => {
                            return <User from="Profile" followers={userFollowers[idx*2+1]} following={userFollowing[idx*2+1]} user={user} />
                        })}
                    </Grid>
                </Grid>
            </Box>
            )
        } else {
            return (
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {col1Item.map((repo, idx) => {
                            return <Repos repo={repo} />
                        })}
                    </Grid>
                    <Grid item xs={6}>
                        {col2Item.map((repo, idx) => {
                            return <Repos repo={repo} />
                        })}
                    </Grid>
                </Grid>
            </Box>
            )
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <div id="avatar">
                <Avatar
                    alt="Remy Sharp"
                    src={user.avatar_url}
                    sx={{ width: 56, height: 56 }}
                />
            </div>
            <div id="intro">
                <span id="content">{user.name}</span>
                <span id="content">{user.login}</span>
                <span>{user.location}</span>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={currentDisplay} onChange={handleChangeDisplay} aria-label="basic tabs example" centered>
                        <Tab label={`Repositories (${user.public_repos})`} {...a11yProps(0)} />
                        <Tab label={`Followers (${user.followers})`} {...a11yProps(1)} />
                        <Tab label={`Following (${user.following})`} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={currentDisplay} index={0}>
                    {user.repos ? renderDisplay(user.repos, 'repos') : null}
                    <Pagination sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }} count={10} page={pageRepos} onChange={handleChangePageRepo} />
                </TabPanel>
                <TabPanel value={currentDisplay} index={1}>
                    {user['followers_users'] ? renderDisplay(user['followers_users'], 'users') : null}
                    <Pagination sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }} count={10} page={pageFollowers} onChange={handleChangePageFollowers} />
                </TabPanel>
                <TabPanel value={currentDisplay} index={2}>
                    {user['following_users'] ? renderDisplay(user['following_users'], 'users') : null}
                    <Pagination sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }} count={10} page={pageFollowing} onChange={handleChangePageFollowing} />
                </TabPanel>
            </Box>
        </div>

    );
}

export default Profile;