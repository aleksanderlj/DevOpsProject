import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AppBar from "./AppBar";
import PostContainer from "./postUI/PostContainer";
import MyProfile from "./profileUI/MyProfile";
import SignIn from "./profileUI/SignIn";
import PostPage from "./postUI/PostPage";
import CreatePost from "./postUI/CreatePost";
import { useCookies, withCookies } from "react-cookie";

// const jonaStore = new JonaStore();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["downvotedLogin"]);

  return (
    <>
      <AppBar />
      <div
        className="App"
        style={{
          marginTop: "100px",
          paddingBottom: "40px",
        }}
      >
        <Switch>
          <Route path={"/profile"}>
            {!cookies.downvotedLogin ? <Redirect to="/" /> : <MyProfile />}
          </Route>
          <Route path={"/signin"}>
            {!cookies.downvotedLogin ? <SignIn /> : <Redirect to="/" />}
          </Route>
          {/*<Route path={"/storestuff"} component={StoreStuff} />*/}
          {/*<Route path={"/param/:text"} component={Param} />*/}
          <Route path={"/createpost"} component={CreatePost} />
          <Route path={"/post/:post"} component={PostPage} />
          <Route path={"/:text"} component={PostContainer} />
          <Route exact path={"/"}>
            <Redirect to={"/All Posts"} component={PostContainer} />
          </Route>
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </>
  );
}

/*const Param = withRouter(({ history, match }) => {
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
});*/

export default withCookies(observer(App));
