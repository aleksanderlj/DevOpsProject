import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import JonaStore from "./stores/JonaStore";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import AppBar from "./AppBar";
import PostContainer from "./postUI/PostContainer";
import MyProfile from "./profileUI/MyProfile";
import PostPage from "./postUI/PostPage";

const jonaStore = new JonaStore();

function App() {
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
        {/*<nav>*/}
        {/*    <ul>*/}
        {/*        <li>*/}
        {/*            <Link to="/">Home</Link>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Link to="/democomponent">Demo component</Link>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Link to="/storestuff">Store stuff</Link>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*</nav>*/}
        <Switch>
          <Route path={"/profile"} component={MyProfile} />
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
    </>
  );
});

export default observer(App);
