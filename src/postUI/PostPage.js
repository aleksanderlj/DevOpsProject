import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Comment, Opacity } from "@mui/icons-material";
import { Grid } from "@mui/material";
import CommentsList from "./CommentsList";

const PostPage = withRouter(({ history, match }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    if(!post){
      fetchPost();
    }
  });

  const fetchPost = () => {
    fetch(process.env.REACT_APP_MONGODB + "/post/" + match.params.post)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((e) => window.alert(e));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item xs={12} sm={12} md={11}>
        <Card style={{ zIndex: 1, position: "relative" }}>
          <CardMedia
            component="img"
            height={"100%"}
            image={post?.imageUrl}
            alt={post?.imageUrl}
          />
          <CardContent style={{ marginBottom: "-1em" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align={"left"}
            >
              {post?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align={"left"}>
              {post?.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing style={{ float: "right" }}>
            <Button
              style={{ color: "brown" }}
              size="medium"
              endIcon={<Comment />}
            >
              {0}
            </Button>
            <Button
              style={{ color: "brown" }}
              size="medium"
              endIcon={<Opacity />}
            >
              {post?.likeCount}
            </Button>
          </CardActions>
        </Card>
        <CommentsList />
      </Grid>
    </Grid>
  );
});

export default PostPage;
