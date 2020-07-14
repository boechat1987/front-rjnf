import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Program from "./screens/Program";
import Register from "./screens/Register";
import Drop from "./screens/Program/dropzone.js";
import ProgramUsuario from "./screens/Program/ProgramUsuario";
import Menu from "./screens/Bootstrap";
import Transport from "./screens/Transport"; 
import './global.css';

const App = () => {

    return (
    <BrowserRouter>
        <Menu />
        <Switch>
            <Route path="/Program/Usuario/:id">
                <ProgramUsuario />
            </Route>
            <Route path="/Program" exact>
                <Program />
            </Route>
            <Route path="/Drop" exact>
                <Drop />
            </Route>
            <Route path="/Signin" exact>
                <Signin />
            </Route>
            <Route path="/Register" exact>
                <Register />
            </Route>
            <Route path="/Transport" exact>
                <Transport />
            </Route>
            <Route path="/" exact>
                <Home />
            </Route>
        </Switch>
    </BrowserRouter>
    )
};

export default App;