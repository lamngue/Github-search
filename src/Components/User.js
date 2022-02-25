import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        position: "relative",
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out",
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)",
    },
    padding: {
        padding: "20px",
    },
});

const User = user => {
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });

    const [like, setLike] = useState(false);

    const cardStyle = {
        display: "block",
        width: "30vw",
        transitionDuration: "0.3s",
        height: "20vh",
    };

    useEffect(() => {
        handleCheckLike(user.user);
    }, []);

    const handleCheckLike = user => {
        let currentFavorites = JSON.parse(localStorage.getItem("Favorite") || "[]");
        if (currentFavorites && currentFavorites.length > 0) {
            const idx = currentFavorites.indexOf(JSON.stringify(user));
            // if user exists in local storage, remove it
            if (idx !== -1) {
                setLike(true);
            } else {
                setLike(false);
            }
        }
    };

    const handleFavorite = user => {
        let currentFavorites = JSON.parse(localStorage.getItem("Favorite") || "[]");
        if (currentFavorites && currentFavorites.length > 0) {
            const idx = currentFavorites.indexOf(JSON.stringify(user));
            // if user exists in local storage, remove it
            if (idx !== -1) {
                setLike(false);
                const userIdx = currentFavorites.findIndex(
                    fav => JSON.parse(fav).login === user.login,
                );
                currentFavorites.splice(userIdx, 1);
            } else {
                setLike(true);
                currentFavorites.push(JSON.stringify(user));
            }
        } else {
            const newFavorites = [];
            setLike(true);
            newFavorites.push(JSON.stringify(user));
            currentFavorites = newFavorites;
        }
        localStorage.setItem("Favorite", JSON.stringify(currentFavorites));
    };

    return (
        <Card
            className={classes.root}
            classes={{ root: state.raised ? classes.cardHovered : "" }}
            onMouseOver={() => setState({ raised: true, shadow: 3 })}
            onMouseOut={() => setState({ raised: false, shadow: 1 })}
            raised={state.raised}
            zdepth={state.shadow}
            style={cardStyle}
            sx={{ maxWidth: 345 }}
        >
            <Link to={`/users/${user.user.login}`}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={user.user.avatar_url}
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                        ></Avatar>
                    }
                    title={user.user.login}
                ></CardHeader>
            </Link>
            <div className={classes.padding}>
                {user.followers > 0 ? user.followers : 0} followers
                <br />
                {user.following > 0 ? user.following : 0} following
            </div>
            <CardActions disableSpacing>
                <IconButton
                    color={like ? "success" : "default"}
                    sx={{ position: "absolute" }}
                    onClick={() => handleFavorite(user.user)}
                    aria-label="add to favorites"
                >
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
export default User;
