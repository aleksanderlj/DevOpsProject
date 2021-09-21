import React from 'react';
import {Button, TextField, Grid} from "@material-ui/core";

const DemoComponent = () => {

    const [name, setName] = React.useState("Insert here")

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <p>Hello {name}</p>
                <input type={"text"} onChange={(e) => {setName(e.target.value)}}/>
                <Button variant="contained" color="primary">Big buttoni</Button>
                <TextField id="standard-basic" label="Standard" />
            </Grid>
        </div>
    );
}

export default DemoComponent;