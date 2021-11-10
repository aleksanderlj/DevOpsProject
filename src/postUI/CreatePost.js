import React, { useState } from "react";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { useCookies } from "react-cookie";
import jwt from "jwt-decode"

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['downvotedLogin']);

    const createPostSubmit = () => {
        if(!cookies.downvotedLogin){
            window.alert("Not logged in");
            throw new Error("User not logged in");
        }
        const token = jwt(cookies.downvotedLogin);
        const time = new Date();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "content": content,
                "userId": token.id,
                "postDate": time.getTime(),
                "imageUrl": imageUrl
            })
        };
        fetch(process.env.REACT_APP_MONGODB + "/post", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                return response.text();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                window.alert(e);
            });
    }

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
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
                <FormControl fullWidth={true} required={true}>
                    <InputLabel>Content</InputLabel>
                    <OutlinedInput
                        id="content"
                        type={"content"}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        label="Content*"
                    />
                </FormControl>
                <FormControl fullWidth={true} required={true}>
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
                disabled={title.length === 0 || content.length === 0}
            >Post</Button>
        </Grid>
    )
}

export default CreatePost;