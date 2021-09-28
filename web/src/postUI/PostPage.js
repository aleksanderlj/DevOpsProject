import React from "react";
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
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item xs={12} sm={12} md={11}>
        <Card style={{ zIndex: 1, position: "relative" }}>
          <CardMedia
            component="img"
            height={"100%"}
            image={
              "https://media.vanityfair.com/photos/5f5156490ca7fe28f9ec3f55/16:9/w_1280,c_limit/feels-good-man-film.jpg"
            }
            alt={
              "https://media.vanityfair.com/photos/5f5156490ca7fe28f9ec3f55/16:9/w_1280,c_limit/feels-good-man-film.jpg"
            }
          />
          <CardContent style={{ marginBottom: "-1em" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align={"left"}
            >
              {match.params.post}
            </Typography>
            <Typography variant="body2" color="text.secondary" align={"left"}>
              {match.params.post}
            </Typography>
          </CardContent>
          <CardActions disableSpacing style={{ float: "right" }}>
            <Button
              style={{ color: "brown" }}
              size="medium"
              endIcon={<Comment />}
            >
              {match.params.post}
            </Button>
            <Button
              style={{ color: "brown" }}
              size="medium"
              endIcon={<Opacity />}
            >
              {match.params.post}
            </Button>
          </CardActions>
        </Card>
        <CommentsList />
      </Grid>
    </Grid>
  );
});

export default PostPage;
