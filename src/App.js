import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Program from "./screens/Program";
import Register from "./screens/Register";
import Drop from "./screens/Program/dropzone.js";
import ProgramUsuario from "./screens/Program/ProgramUsuario";
/* import Menu from "./screens/Bootstrap"; */
import Transport from "./screens/Transport"; 
import './global.css';

const App = () => {

    return (
    <BrowserRouter>
        {/* <Menu /> */}
        <Switch>
            <Route path="/Program/Usuario/:id">
                <ProgramUsuario />
            </Route>
            <Route path="/Program/:id" >
                <Program />
            </Route>
            <Route path="/Drop" >
                <Drop />
            </Route>
            <Route path="/Signin" >
                <Signin />
                <Home />
            </Route>
            <Route path="/Register" >
                <Register />
            </Route>
            <Route path="/Transport" >
                <Transport />
            </Route>
            <Route path="/" exact>
                <Signin />
                <Home />
            </Route>
        </Switch>
    </BrowserRouter>
    )
};

export default App;