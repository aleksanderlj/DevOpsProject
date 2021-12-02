import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useCookies } from "react-cookie";
import RESTStore from "../stores/RESTStore";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const restStore = new RESTStore();

const CreatePost = observer(({ newPostSubmitted }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["downvotedLogin"]);

  const createPostSubmit = () => {
    if (!cookies.downvotedLogin) {
      window.alert("You are not logged in!");
      return;
    }
    restStore
      .createPostSubmit(
        cookies.downvotedLogin,
        title,
        content,
        imageUrl,
        history.location.pathname.substring(1)
      )
      .then(() => {
        setTitle("");
        setContent("");
        setImageUrl("");
        newPostSubmitted();
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <form id="createPostForm" onSubmit={() => createPostSubmit()}>
        <FormControl
          sx={{ marginBottom: "15px" }}
          fullWidth={true}
          required={true}
        >
          <InputLabel>Title</InputLabel>
          <OutlinedInput
            id="title"
            type={"title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title*"
          />
        </FormControl>
        <FormControl
          sx={{ marginBottom: "15px" }}
          fullWidth={true}
          required={true}
        >
          <InputLabel>Content</InputLabel>
          <OutlinedInput
            id="content"
            type={"content"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Content*"
          />
        </FormControl>
        <FormControl
          sx={{ marginBottom: "15px" }}
          fullWidth={true}
          required={true}
        >
          <InputLabel>Image URL</InputLabel>
          <OutlinedInput
            id="imageUrl"
            type={"imageUrl"}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            label="Image URL*"
          />
        </FormControl>
      </form>
      <Button
        form={"createPostForm"}
        type={"submit"}
        variant={"contained"}
        size="large"
        disabled={
          title.length === 0 || content.length === 0 || imageUrl.length === 0
        }
      >
        SUBMIT POST
      </Button>
    </Grid>
  );
});

export default CreatePost;
