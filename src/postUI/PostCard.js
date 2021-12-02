import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Comment, ThumbDown, ThumbDownOffAlt } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { Tooltip, useTheme } from "@mui/material";
import { isMobile } from "react-device-detect";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import "./PostCard.css";

const PostCard = ({
  postId,
  title,
  description,
  date,
  imageLink,
  commentCount,
  shitCount,
  subforum,
  author,
}) => {
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + " ..." : str;
  };

  const theme = useTheme();
  const history = useHistory();
  const [liked, setLiked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(shitCount);
  const [cookies, setCookie, removeCookie] = useCookies(["downvotedLogin"]);
  const REACT_APP_MONGODB = process.env;
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const dateObject = new Date(date);

  useEffect(() => {
    if (!liked && !loading && cookies.downvotedLogin) {
      fetchLikeStatus();
    }
  });

  const fetchLikeStatus = () => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        Authorization: cookies.downvotedLogin,
      },
    };
    fetch(
      process.env.REACT_APP_MONGODB + "/post/" + postId + "/likestatus",
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
        setLoading(false);
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
      process.env.REACT_APP_MONGODB + "/post/" + postId + "/like",
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
          setLikeCount((count) => count + 1);
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
      process.env.REACT_APP_MONGODB + "/post/" + postId + "/unlike",
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
          setLikeCount((count) => count - 1);
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
    <Card className={"card"}>
      <CardMedia
        component="img"
        height={"150vh"}
        image={imageLink}
        alt={imageLink}
        onClick={() => history.push("/post/" + postId)}
      />
      <CardContent
        style={{ marginBottom: "-1em" }}
        onClick={() => history.push("/post/" + postId)}
      >
        <div>
          <Typography variant={"caption"} style={{ float: "right" }}>
            {dateObject.toLocaleTimeString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            &nbsp;on&nbsp;"{!subforum ? "All Posts" : subforum}" by {author}
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            gutterBottom
            variant="h5"
            component="div"
            align={"left"}
            fontWeight={"bold"}
          >
            {title}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary" align={"left"}>
          {truncate(description, 100)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{ float: "right" }}>
        <Button
          style={{ color: theme.palette.secondary.main }}
          size="medium"
          endIcon={<Comment />}
        >
          {commentCount}
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
                  {likeCount}
                </Button>
              </Tooltip>
           </ClickAwayListener>
      </CardActions>
    </Card>
  );
};

export default PostCard;
