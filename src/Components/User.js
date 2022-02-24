import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out"
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    }
});

const User = (user) => {
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    })
    const cardStyle = {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '20vh'
    }

    const navigate = useNavigate();

    return (
        <Link to={`/users/${user.user.login}`}>

            <Card className={classes.root}
                classes={{ root: state.raised ? classes.cardHovered : "" }}
                onMouseOver={() => setState({ raised: true, shadow: 3 })}
                onMouseOut={() => setState({ raised: false, shadow: 1 })}
                raised={state.raised} zdepth={state.shadow} style={cardStyle} sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar src={user.user.avatar_url} sx={{ bgcolor: red[500] }} aria-label="recipe">

                        </Avatar>
                    }
                    title={user.user.login}
                >
                </CardHeader>
                {user.followers > 0 ? user.followers : 0} followers
                {user.following > 0 ? user.following : 0} following
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
            </Link>
    );
}

export default User;