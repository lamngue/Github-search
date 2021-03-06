import React, { useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { debounce } from "lodash";
import { actionCreators } from "../State/index";
import { useSelector } from "react-redux";
import Results from "./Results";
const SearchBar = () => {
    const searchTerm = useSelector(state => state.searchTerm);

    const dispatch = useDispatch();
    const { fetchUser, setUsers, setPageUsers, setSearchTerm, clearFollowers, clearFollowing } =
        bindActionCreators(actionCreators, dispatch);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleFetchUser = useCallback(
        debounce(str => {
            fetchUser(str);
        }, 200),
    );

    useEffect(() => {
        clearFollowers();
        clearFollowing();
        setPageUsers(0);
        if (searchTerm) {
            handleFetchUser(searchTerm);
        } else {
            setUsers([]);
        }
    }, [searchTerm]);

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
                {/* <Button variant="contained" onClick={handleClick}>
                    Search
                </Button> */}
                <Results />
            </div>
        </div>
    );
};

export default SearchBar;
