import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Skeleton,
  Slide,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PostCard from "./PostCard";
import { Add } from "@mui/icons-material";
import CreatePost from "./CreatePost";
import { useCookies } from "react-cookie";

const fabStyle = {
  right: 20,
  bottom: 20,
  position: "fixed",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostContainer = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState(null);
  const skeletonPosts = [0, 1, 2, 3, 4, 5];
  const [open, setOpen] = useState(false);
  const [newPostToFetch, setNewPostToFetch] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["downvotedLogin"]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newPostSubmitted = () => {
    setNewPostToFetch(true);
  };

  const fetchPosts = () => {
    fetch(process.env.REACT_APP_MONGODB + "/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((e) => window.alert(e));
  };

  useEffect(() => {
    if (!posts) {
      fetchPosts();
    } else if (posts && newPostToFetch) {
      fetchPosts();
      setOpen(false);
      setNewPostToFetch(false);
    }
  }, [newPostToFetch]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <DialogTitle color={theme.palette.primary.main}>
            {"CREATE NEW POST"}
          </DialogTitle>
          <CreatePost newPostSubmitted={newPostSubmitted} />
        </DialogContent>
      </Dialog>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        {posts
          ? posts.map((post) => (
              <Grid item xs={11} sm={11} md={5}>
                <PostCard
                  key={post.id}
                  postId={post.id}
                  title={post.title}
                  description={post.content}
                  imageLink={
                    post.imageUrl
                      ? post.imageUrl
                      : "https://media.vanityfair.com/photos/5f5156490ca7fe28f9ec3f55/16:9/w_1280,c_limit/feels-good-man-film.jpg"
                  }
                  date={post.postDate}
                  commentCount={233}
                  shitCount={post.likeCount}
                />
              </Grid>
            ))
          : skeletonPosts.map((skeleton) => (
              <Grid item xs={11} sm={11} md={5}>
                <Skeleton
                  variant={"rectangular"}
                  key={skeleton}
                  width={"100%"}
                  height={"280px"}
                />
              </Grid>
            ))}
      </Grid>
      <Tooltip
        title={
          <Typography variant={"button"}>
            {cookies.downvotedLogin
              ? "Create a new post"
              : "You need to login to submit posts"}
          </Typography>
        }
      >
        <Fab
          disabled={!cookies.downvotedLogin}
          style={fabStyle}
          color="primary"
          onClick={() => handleClickOpen()}
        >
          <Add />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default PostContainer;
