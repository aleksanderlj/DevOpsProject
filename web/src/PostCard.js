import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Comment, Opacity} from "@mui/icons-material";

const PostCard = ({title, description, imageLink, commentCount, shitCount}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height={"150em"}
                image={imageLink}
                alt={imageLink}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align={"left"}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align={"left"}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{float: "right"}}>
                <Button style={{color: "brown"}} size="medium" endIcon={<Comment/>}>{commentCount}</Button>
                <Button style={{color: "brown"}} size="medium" endIcon={<Opacity/>}>{shitCount}</Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;
