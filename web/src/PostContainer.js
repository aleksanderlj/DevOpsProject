import React from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";

const PostContainer = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={11} sm={11} md={5}>
        <PostCard
          title={"Poop"}
          description={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
          imageLink={
            "https://media.vanityfair.com/photos/5f5156490ca7fe28f9ec3f55/16:9/w_1280,c_limit/feels-good-man-film.jpg"
          }
          commentCount={233}
          shitCount={1253}
        />
      </Grid>
      <Grid item xs={11} sm={11} md={5}>
        <PostCard
          title={"Pepe Noice!!"}
          description={
            "I just really like Pepe the Frog - reeeeeeeeeeeeeeeeeeeeeee lololol"
          }
          imageLink={
            "https://api.time.com/wp-content/uploads/2016/10/pepe-the-frog-matt-furie-hate-symbol-racism-anti-defamation-league-4chan.jpg?quality=85&w=813&h=484&crop=1"
          }
          commentCount={12}
          shitCount={9000}
        />
      </Grid>
      <Grid item xs={11} sm={11} md={5}>
        <PostCard
          title={"I liek gunz"}
          description={"Pew pew on school?"}
          imageLink={
            "https://techcrunch.com/wp-content/uploads/2016/09/whats-a-shitpost.jpg?w=730&crop=1"
          }
          commentCount={999}
          shitCount={2}
        />
      </Grid>
      <Grid item xs={11} sm={11} md={5}>
        <PostCard
          title={"Sweet site brooos!"}
          description={"What a sweet community for shitting!"}
          imageLink={"https://shitpost.to/inc/img/logo.png"}
          commentCount={120}
          shitCount={5}
        />
      </Grid>
    </Grid>
  );
};

export default PostContainer;
