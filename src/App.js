import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./Components/SearchBar";
import Likes from "./Components/Liked";
import Profile from "./Components/Profile";

function App() {
    const [value, setValue] = React.useState(0);

    return (
        <div style={{ display: "grid", gridAutoFlow: "column", justifyContent: "space-between" }}>
            <div> </div>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<SearchBar />} />
                        <Route path="/likes" element={<Likes />} />
                        <Route path="/users/:username" element={<Profile />} />
                    </Routes>
                    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction
                                component={Link}
                                to="/"
                                label="Search"
                                icon={<SearchIcon />}
                            />
                            <BottomNavigationAction
                                component={Link}
                                to="/likes"
                                label="Favorites"
                                icon={<FavoriteIcon />}
                            />
                        </BottomNavigation>
                    </Box>
                </Router>
            </div>
            <div></div>
        </div>
    );
}

export default App;
