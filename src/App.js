import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Program from "./screens/Program";
import Drop from "./screens/Program/dropzone.js";
import ProgramUsuario from "./screens/Program/ProgramUsuario";
import './global.css';

const App = () => {
    return (
    <BrowserRouter>
        <ul className="margemlink">
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
        <ul className="margemlink">
            <li>
                <Link to="/Program">Programação</Link>
            </li>
        </ul>
        <ul className="margemlink">
            <li>
                <Link to="/Drop">Dropzone</Link>
            </li>
        </ul>
        <ul className="margemlink">
            <li>
                <Link to="/Signin">Signin</Link>
            </li>
        </ul>
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
            <Route path="/" exact>
                <Home />
            </Route>
        </Switch>
    </BrowserRouter>
    )
};

export default App;