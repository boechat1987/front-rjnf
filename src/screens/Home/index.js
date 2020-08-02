import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../helper/token';
import { doGet } from "../../helper/ApiHelper";
import './styles.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    doGet("users").then((response) => setUsers(response));
  }, []);

  if (!users || !users.length) {
    return <h1>Loading...</h1>;
  }

  const usersList = users.map((p) => {
    const id = p.id;
    return <li key={id}><Link to={`/Program/${id}`}>{p.username}</Link></li>;

  });

  return (
    <div className="menu-names">
      {isAuthenticated ? (  <>
      <h1>Usuários</h1>
      <ul className="list-names" >
        {usersList}
      </ul></>) : (<h1>aaa</h1>)}
    </div>
  );
};

export default Home;
