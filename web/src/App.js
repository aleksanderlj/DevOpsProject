import logo from './logo.svg';
import './App.css';
import DemoComponent from "./DemoComponent";
import {Button, TextField, Grid} from "@material-ui/core";
import {
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import JonaStore from "./stores/JonaStore";
import {observer} from "mobx-react-lite";

const jonaStore = new JonaStore();

function App() {
    return (
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/democomponent">Demo component</Link>
                        </li>
                        <li>
                            <Link to="/storestuff">Store stuff</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path={"/democomponent"} component={DemoComponent} />
                    <Route path={"/storestuff"} component={StoreStuff} />
                    <Route path={"/param/:text"} component={Param}/>
                    <Route exact path={"/"} component={Home}/>
                    <Route render={() => <h1>404</h1>}/>
                </Switch>
            </div>
    );
}

const Home = () => {
    return <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </header>
};

const Param = withRouter(({history, match}) => {
    console.log(match);
    return <>
        <h1>Hello {match.params.text}</h1>
        <Button onClick={()=>history.push("/")}>Go to front</Button>
    </>
});

const StoreStuff = observer(() => {
    return <>
        <ul>
            {jonaStore.brothers.map((name, key) =>
                <li key={key}>{key} : {name}</li>
            )}
        </ul>
        <Button onClick={()=>{jonaStore.brothers.push("Jonas"); console.log(jonaStore.brothers)}}>Add the next</Button>
        <Button disabled={jonaStore.status === "LOADING"}
                style={{backgroundColor: jonaStore.status === "FAILED" ? "red" : jonaStore.status === "LOADING" ? "yellow" : null}}
                onClick={() => {
                    jonaStore.fetchNames();
                    console.log(jonaStore.brothers)
                }}>{jonaStore.status === "FAILED" ? "FAILED" : jonaStore.status === "LOADING" ? "LOADING" : "CLICK TO CHANGE"}</Button>
        <Button onClick={() => {jonaStore.addName("Fesk")}}
        >Add name</Button>
    </>
});

export default observer(App);
