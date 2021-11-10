import React, { useEffect, useState } from "react";
import { Fab, Grid, Skeleton } from "@mui/material";
import PostCard from "./PostCard";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const PostContainer = () => {
  const history = useHistory();
  const [posts, setPosts] = useState(null);
  const skeletonPosts = [0, 1, 2, 3, 4, 5];

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
    }
  }, []);

  const fabStyle = {
    right: 20,
    bottom: 20,
    position: 'fixed'
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        {posts
          ? posts.map((post) => (
            <Grid item xs={11} sm={11} md={5}>
              <PostCard
                key={post.id}
                title={post.title}
                description={post.content}
                imageLink={
                  post.imageUrl
                    ? post.imageUrl
                    : "https://media.vanityfair.com/photos/5f5156490ca7fe28f9ec3f55/16:9/w_1280,c_limit/feels-good-man-film.jpg"
                }
                date={post.postDate}
                commentCount={233}
                shitCount={1253}
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
      <Fab style={fabStyle} color="primary" aria-label="add" onClick={() => history.push("/createpost")}>
        <Add />
      </Fab>
    </div>
  );
};

export default PostContainer;
