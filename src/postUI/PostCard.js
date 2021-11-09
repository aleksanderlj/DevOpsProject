import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Comment, Opacity } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import "./PostCard.css";

const PostCard = ({
  title,
  description,
  date,
  imageLink,
  commentCount,
  shitCount,
}) => {
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + " ..." : str;
  };

  const theme = useTheme();

  const dateObject = new Date(date);

  return (
    <Card className={"card"}>
      <CardMedia
        component="img"
        height={"150vh"}
        image={imageLink}
        alt={imageLink}
      />
      <CardContent style={{ marginBottom: "-1em" }}>
        <div>
          <Typography gutterBottom variant="h5" component="div" align={"left"}>
            <Link
              to={"/post/" + title.toString()}
              style={{ color: theme.palette.primary.main }}
            >
              {title}
            </Link>
            <Typography variant={"caption"} style={{ float: "right" }}>
              {dateObject.toLocaleTimeString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Typography>
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
        <Button
          style={{ color: theme.palette.secondary.main }}
          size="medium"
          endIcon={<Opacity />}
        >
          {shitCount}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
