import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { makeStyles } from "@mui/styles";
import "../CSS/style.css";

const useStyles = makeStyles({
    root: {
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

const Repos = repo => {
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });
    const cardStyle = {
        display: "block",
        width: "30vw",
        transitionDuration: "0.3s",
        height: "200px",
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
            <CardHeader title={repo.repo.name}></CardHeader>
            <div className={classes.padding}>
                {repo.repo.stargazers_count > 0 ? repo.repo.stargazers_count : 0} stars
                <br />
                {repo.repo.forks_count > 0 ? repo.repo.forks_count : 0} forks
            </div>
        </Card>
    );
};

export default Repos;
