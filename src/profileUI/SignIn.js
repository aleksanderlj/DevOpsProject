import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import {
  Button,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import "./SignIn.css";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const clientId =
  "191430355915-jgfp9tt0cacihubuggmuqoooqolooord.apps.googleusercontent.com";
const { REACT_APP_MONGODB } = process.env;

export default function SignIn() {
  const theme = useTheme();
  const history = useHistory();
  const [loginSucces, setLoginSucces] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['downvotedLogin']);

  const onGoogleLoginSuccess = (res) => {
    console.log("Login success for: ", res.profileObj);
    console.log("Send to backend: ", res.getAuthResponse().id_token);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: res.getAuthResponse().id_token,
    };
    console.log(REACT_APP_MONGODB);
    fetch(process.env.REACT_APP_MONGODB + "/user/login/google", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        setCookie("downvotedLogin", data, {path: "/"});
        console.log("cookie: " + cookies.downvotedLogin);
        setLoginSucces(true);
      });
  };

  const onGoogleLoginFailure = (res) => {
    console.log("YOU CAN NEVER LEAVE", res);
  };

  const onLogoutSuccess = (res) => {
    console.log("Logout success");
  };

  const onLogoutFailure = (res) => {
    console.log("Logout go nono", res);
  };

  const loginFormSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "username": username, "password": password })
    };
    fetch(process.env.REACT_APP_MONGODB + "/user/login", requestOptions)
      .then((response) => {
        if(!response.ok) {
          throw new Error("Invalid login data");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        setCookie("downvotedLogin", data, {path: "/"});
        setLoginSucces(true);
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const signupFormSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "username": newUsername, "password": newPassword })
    };
    fetch(process.env.REACT_APP_MONGODB + "/user", requestOptions)
    .then((response) => {
      if(!response.ok) {
        throw new Error("User already exists");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      setCookie("downvotedLogin", data, {path: "/"});
      setLoginSucces(true);
    })
    .catch((e) => {
      window.alert(e);
    });
  };

  useEffect(() => {
    if (loginSucces === true) {
      history.push("/");
    }
  }, [loginSucces]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      history.push("/");
    }
  }, [sessionStorage]);

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Grid item direction={"row"} xs={10} md={5} lg={5}>
        <Card className={"loginCard"}>
          <CardContent>
            <Typography
              color={theme.palette.secondary.main}
              fontWeight={"bold"}
              align={"left"}
              variant="h5"
              sx={{ marginBottom: "10px" }}
            >
              LOGIN
            </Typography>
            <form id="loginForm" onSubmit={() => loginFormSubmit()}>
              <FormControl
                sx={{ marginBottom: "15px" }}
                fullWidth={true}
                required={true}
              >
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  id="username"
                  type={"username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username*"
                />
              </FormControl>
              <FormControl fullWidth={true} required={true}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password*"
                />
              </FormControl>
            </form>
          </CardContent>
          <CardActions sx={{ float: "right" }}>
            <Button
              form={"loginForm"}
              type={"submit"}
              variant={"contained"}
              size="large"
              disabled={username.length === 0 || password.length === 0}
            >
              LOGIN
            </Button>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={onGoogleLoginSuccess}
              onFailure={onGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
            {/* <GoogleLogout clientId={clientId}
                                  buttonText="Logout"
                                  onLogoutSuccess={() => onLogoutSuccess}
                                  onGoogleLoginFailure={() => onLogoutFailure}/>*/}
          </CardActions>
        </Card>
      </Grid>
      <Grid item direction={"row"} xs={10} md={5} lg={5}>
        <Card className={"signupCard"}>
          <CardContent>
            <Typography
              color={theme.palette.primary.main}
              align={"right"}
              fontWeight={"bold"}
              variant="h5"
              sx={{ marginBottom: "10px" }}
            >
              CREATE A NEW USER
            </Typography>
            <form id="signupForm" onSubmit={() => signupFormSubmit()}>
              <FormControl
                sx={{ marginBottom: "15px" }}
                fullWidth={true}
                required={true}
              >
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  id="newUsername"
                  type={"username"}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  label="Username*"
                />
              </FormControl>
              <FormControl fullWidth={true} required={true}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  id="newPassword"
                  type={"password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="Password*"
                />
              </FormControl>
            </form>
            <Typography
              color={"red"}
              sx={{ float: "left" }}
              align={"left"}
              variant="caption"
            >
              *BY SIGNING UP YOU ACCEPT OUR SHITTY SECURITY ;-)
            </Typography>
          </CardContent>
          <CardActions sx={{ float: "right" }}>
            <Button
              form={"signupForm"}
              type={"submit"}
              variant={"contained"}
              size="large"
              disabled={newUsername.length === 0 || newPassword.length === 0}
            >
              *SIGN UP
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
