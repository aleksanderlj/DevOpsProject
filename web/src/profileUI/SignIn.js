import React from "react";
import GoogleLogin, {GoogleLogout} from "react-google-login";

const clientId = "191430355915-jgfp9tt0cacihubuggmuqoooqolooord.apps.googleusercontent.com";

const onSuccess = (res) => {
    console.log("Login success for: ", res.profileObj);
};

const onFailure = (res) => {
    console.log("Login go nono", res);
};

const onLogoutSuccess = (res) => {
    console.log("Logout success")
};

const onLogoutFailure = (res) => {
    console.log("Logout go nono", res);
};

const SignIn = () => {
    return(
        <div>
            <GoogleLogin clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}/>
            <GoogleLogout clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
            onFailure={onLogoutFailure}/>
        </div>
    )
}

export default SignIn;