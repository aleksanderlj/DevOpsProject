import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import JonaStore from "./stores/JonaStore";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import AppBar from "./AppBar";
import PostContainer from "./postUI/PostContainer";
import MyProfile from "./profileUI/MyProfile";
import SignIn from "./profileUI/SignIn";
import PostPage from "./postUI/PostPage";
import { useEffect, useState } from "react";
import { withCookies } from "react-cookie";

const jonaStore = new JonaStore();

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <AppBar />
      <div
        className="App"
        style={{
          marginTop: "7em",
          paddingBottom: "4em",
        }}
      >
        <Switch>
          <Route path={"/profile"} component={MyProfile} />
          <Route path={"/signin"} component={SignIn} />
          <Route path={"/storestuff"} component={StoreStuff} />
          <Route path={"/param/:text"} component={Param} />
          <Route path={"/post/:post"} component={PostPage} />
          <Route exact path={"/"} component={PostContainer} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </>
  );
}

const Param = withRouter(({ history, match }) => {
  console.log(match);
  return (
    <>
      <h1>Hello {match.params.text}</h1>
      <Button onClick={() => history.push("/")}>Go to front</Button>
    </>
  );
});

const StoreStuff = observer(() => {
  return (
    <>
      <ul>
        {jonaStore.brothers.map((name, key) => (
          <li key={key}>
            {key} : {name}
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          jonaStore.brothers.push("Jonas");
          console.log(jonaStore.brothers);
        }}
      >
        Add the next
      </Button>
      <Button
        disabled={jonaStore.status === "LOADING"}
        style={{
          backgroundColor:
            jonaStore.status === "FAILED"
              ? "red"
              : jonaStore.status === "LOADING"
              ? "yellow"
              : null,
        }}
        onClick={() => {
          jonaStore.fetchNames();
          console.log(jonaStore.brothers);
        }}
      >
        {jonaStore.status === "FAILED"
          ? "FAILED"
          : jonaStore.status === "LOADING"
          ? "LOADING"
          : "CLICK TO CHANGE"}
      </Button>
      <Button
        onClick={() => {
          jonaStore.addName("Fesk");
        }}
      >
        Add name
      </Button>
    </>
  );
});

export default withCookies(observer(App));
