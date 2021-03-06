import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Comment, ThumbDown, ThumbDownOffAlt } from "@mui/icons-material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CommentsList from "./CommentsList";
import { Tooltip, useTheme } from "@mui/material";
import { Grid } from "@mui/material";
import { isMobile } from "react-device-detect";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const PostPage = withRouter(({ history, match }) => {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["downvotedLogin"]);
  const { REACT_APP_MONGODB } = process.env;
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!post) {
      fetchPost();
    }
    if (post && !liked && cookies.downvotedLogin) {
      fetchLikeStatus();
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

  const fetchLikeStatus = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        Authorization: cookies.downvotedLogin,
      },
    };
    fetch(
      process.env.REACT_APP_MONGODB + "/post/" + post.id + "/likestatus",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid login data");
        }
        return response.json();
      })
      .then((data) => {
        setLiked(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const likePost = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Authorization: cookies.downvotedLogin,
      },
    };
    fetch(
      process.env.REACT_APP_MONGODB + "/post/" + post.id + "/like",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid login data");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          post.likeCount++;
        }
        setLiked(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const unlikePost = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Authorization: cookies.downvotedLogin,
      },
    };
    fetch(
      process.env.REACT_APP_MONGODB + "/post/" + post.id + "/unlike",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid login data");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          post.likeCount--;
        }
        setLiked(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const votePost = () => {
    if (!liked) {
      likePost();
    } else {
      unlikePost();
    }
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
              style={{ color: theme.palette.secondary.main }}
              size="medium"
              endIcon={<Comment />}
            >
              {5}
            </Button>
            <ClickAwayListener onClickAway={handleTooltipClose}>
            
              <Tooltip
                  title={!cookies.downvotedLogin ? "You need to be logged in to vote!" : ""}
                  open={showTooltip}
                  onOpen={() => setShowTooltip(true)}
                  onClose={() => setShowTooltip(false)}
                  placement={"top"}
                >
                <Button
                  style={{ color: theme.palette.secondary.main }}
                  size="medium"
                  endIcon={liked ? <ThumbDown /> : <ThumbDownOffAlt />}
                  onClick={() => {
                    if(cookies.downvotedLogin){
                     votePost()
                   }else{
                     setShowTooltip(!showTooltip)
                     console.log("User not logged in");
                   }
             }}
                >
                  {post?.likeCount}
                </Button>
              </Tooltip>
           </ClickAwayListener>
          </CardActions>
        </Card>
        <CommentsList />
      </Grid>
    </Grid>
  );
});

export default PostPage;
