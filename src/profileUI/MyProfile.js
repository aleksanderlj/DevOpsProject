import React from "react";
import { Button } from "@mui/material";

const fetchGiraffes = () => {
  fetch("http://localhost:8080/rest/test/query").then((res) =>
    console.log(res.status)
  );
};

const MyProfile = () => {
  return (
    <div>
      <h1>This is the Profile Page</h1>
      <h1>This is also an Easter Egg - good job!</h1>
      <Button onClick={() => fetchGiraffes()}>Throw exception</Button>
    </div>
  );
};

export default MyProfile;
