import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Program from "./screens/Program";
import ProgramUsuario from "./screens/Program/ProgramUsuario";
import './global.css';

const App = () => {
    return (
    <BrowserRouter>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to="/Program">Programação</Link>
            </li>
        </ul>
        <Switch>
            <Route path="/Program/Usuario/:id">
                <ProgramUsuario />
            </Route>
            <Route path="/Program" exact>
                <Program />
            </Route>
            <Route path="/" exact>
                <Home />
                <Signin />
            </Route>
        </Switch>
    </BrowserRouter>
    )
};

export default App;