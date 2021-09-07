import React from 'react';

const DemoComponent = () => {

    const [name, setName] = React.useState("Insert here")

    return (
        <div>
        <p>Hello {name}</p>
    <input type={"text"} onChange={(e) => {setName(e.target.value)}}/>
    </div>
);
}

export default DemoComponent;