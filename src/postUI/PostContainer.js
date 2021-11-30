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
import { Add, Help } from "@mui/icons-material";
import CreatePost from "./CreatePost";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import RESTStore from "../stores/RESTStore";
import { observer } from "mobx-react-lite";

const fabStyle = {
  right: 20,
  bottom: 20,
  position: "fixed",
  overflow: "hidden",
};
const restStore = new RESTStore();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostContainer = observer(() => {
  const theme = useTheme();
  const history = useHistory();
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

  useEffect(() => {
    setNewPostToFetch(true);
  }, [history.location.pathname]);

  useEffect(() => {
    if (
      history.location.pathname.substring(1) !== "All Posts" &&
      newPostToFetch
    ) {
      console.log("Fetcher nyt fra sub");
      restStore
        .fetchPostsFromSub(history.location.pathname.substring(1))
        .then(() => {
          setOpen(false);
          setNewPostToFetch(false);
        });
    }
  }, [newPostToFetch]);

  useEffect(() => {
    if (
      history.location.pathname.substring(1) === "All Posts" &&
      restStore.posts.length === 0
    ) {
      console.log("Fetcher nyt fra ALL");
      restStore.fetchAllPosts().then(() => {
        setOpen(false);
        setNewPostToFetch(false);
      });
    } else if (
      history.location.pathname.substring(1) === "All Posts" &&
      newPostToFetch
    ) {
      console.log("Fetcher nyt fra ALL med refresh");
      restStore.fetchAllPosts().then(() => {
        setOpen(false);
        setNewPostToFetch(false);
      });
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
        {restStore?.posts?.length > 0 && !newPostToFetch
          ? restStore.posts.map((post) => (
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
                  commentCount={5}
                  shitCount={post.likeCount}
                  subforum={post.subforum}
                  author={post.author}
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
        placement={"left"}
        title={
          <Typography variant={"button"}>
            {!cookies.downvotedLogin
              ? "You need to login to submit posts"
              : "Create a new post"}
          </Typography>
        }
      >
        <Fab
          sx={{
            display:
              history.location.pathname.substring(1) === "All Posts"
                ? "none"
                : "",
          }}
          disableFocusRipple={!cookies.downvotedLogin}
          disableTouchRipple={!cookies.downvotedLogin}
          style={fabStyle}
          color="primary"
          onClick={() =>
            !cookies.downvotedLogin
              ? history.push("/signin")
              : handleClickOpen()
          }
        >
          {!cookies.downvotedLogin ? <Help /> : <Add />}
        </Fab>
      </Tooltip>
    </div>
  );
});

export default PostContainer;
