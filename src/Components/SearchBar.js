import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../State/index";
import { useSelector } from "react-redux";
import Results from "./Results";
const SearchBar = () => {
    const searchTerm = useSelector(state => state.searchTerm);
    const pageUsers = useSelector(state => state.pageUsers);

    const dispatch = useDispatch();
    const { fetchUser, setPageUsers, setSearchTerm, clearFollowers, clearFollowing } =
        bindActionCreators(actionCreators, dispatch);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };
    const handleClick = () => {
        try {
            clearFollowers();
            clearFollowing();
            setPageUsers(0);
            fetchUser(searchTerm);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h2>Search</h2>
            <div>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Enter GitHub username, i.e Ferrari"
                    value={searchTerm}
                    onChange={handleChange}
                    variant="outlined"
                />
                <Button variant="contained" onClick={handleClick}>
                    Search
                </Button>
                <Results />
            </div>
        </div>
    );
};

export default SearchBar;
