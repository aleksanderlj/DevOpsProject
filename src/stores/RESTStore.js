import { makeObservable, observable, runInAction } from "mobx";
import jwt from "jwt-decode";

const baseUrl = process.env.REACT_APP_MONGODB;

class RESTStore {
  posts = [];
  fetchStatus = "";
  loggedIn = false;

  constructor() {
    makeObservable(this, {
      posts: observable,
      fetchStatus: observable,
      loggedIn: observable,
    });
  }

  async fetchAllPosts() {
    runInAction(() => (this.fetchStatus = "LOADING"));
    try {
      const response = await fetch(baseUrl + "/post");
      const json = await response.json();
      runInAction(() => (this.posts = json));
      runInAction(() => (this.fetchStatus = "DONE"));
    } catch (e) {
      runInAction(() => (this.fetchStatus = "FAILED"));
      console.log(e);
    }
  }

  async fetchPostsFromSub(activeSub) {
    if (activeSub !== "All Posts") {
      runInAction(() => (this.fetchStatus = "LOADING"));
      try {
        const response = await fetch(
          baseUrl + "/forum/" + activeSub.toLowerCase() + "/posts"
        );
        const json = await response.json();
        runInAction(() => (this.posts = json));
        runInAction(() => (this.fetchStatus = "DONE"));
      } catch (e) {
        runInAction(() => (this.fetchStatus = "FAILED"));
        console.log(e);
      }
    }
  }

  async createPostSubmit(cookieToken, title, content, imageUrl, subforum) {
    runInAction(() => (this.fetchStatus = "LOADING"));
    try {
      const token = jwt(cookieToken);
      const time = new Date();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookieToken
        },
        body: JSON.stringify({
          title: title,
          content: content,
          userId: token.id,
          postDate: time.getTime(),
          imageUrl: imageUrl,
          subforum: subforum.toLowerCase(),
        }),
      };
      const response = await fetch(baseUrl + "/post", requestOptions);
      runInAction(() => (this.fetchStatus = "DONE"));
    } catch (e) {
      runInAction(() => (this.fetchStatus = "FAILED"));
      console.log(e);
    }
  }
}
export default RESTStore;
