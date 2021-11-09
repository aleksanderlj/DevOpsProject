import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";

const PostContainer = () => {
  const [posts, setPosts] = useState(null);

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

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      {posts?.map((post) => (
        <Grid item xs={11} sm={11} md={5}>
          <PostCard
            key={post.id}
            title={post.title}
            description={post.content}
            imageLink={
              "https://media.vanityfair.com/photos/5f5156490ca7fe28f9ec3f55/16:9/w_1280,c_limit/feels-good-man-film.jpg"
            }
            commentCount={233}
            shitCount={1253}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostContainer;
