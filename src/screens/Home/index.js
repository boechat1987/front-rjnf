import React from "react"; 
/*import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../helper/token';
import { doGet } from "../../helper/ApiHelper"; */
import { ReactComponent as Logo } from "../../assets/logo.svg";
import './stylecardreset.css';
import './styles.css';
import './stylecard.css';

const Home = () => {



  return(
    <div className="background">
    <div className="body">
      <header>
      <h1 className="title">Escala da Malha</h1>
      <div className="options">
        <button href="#" className="options-link">Programação</button>
        <button href="#2" className="options-link">Sobreaviso</button>
        <button href="#3" className="options-link">Transporte</button>
      </div>
      </header>
      <div className="main">
            <div className="section">
              <h2>Programação Semanal</h2>
              <p>Some Text goes here, some text goes here, some text goes here, some text goes here.</p>
              <button href="#" className="info-link">Mais...</button>
            </div>
            <div className="section">
              <h2>Sobreaviso</h2>
              <p>Some Text goes here, some text goes here, some text goes here, some text goes here.</p>
              <Logo
                alt=""
                width="50"
                height="50"
                className="d-inline-block align-top"
              />
              {/* <img className="section-img" src="Logo" alt="important graph"></img> */}
              <button href="#" className="info-link">Mais...</button>
            </div>
            <div className="section">
              <h2>Transporte</h2>
              <Logo
                alt=""
                width="50"
                height="50"
                className="d-inline-block align-top"
              />
              <p>Some Text goes here, some text goes here, some text goes here, some text goes here.</p>
              <button href="#" className="info-link">Mais...</button>
            </div>
            <div className="section">
              <h2>Dados Usuário</h2>
              <p>Some Text goes here, some text goes here, some text goes here, some text goes here.</p>
              <button className="info-link" href="#" >Mais...</button>
            </div>
            <div className="section">
              <h2 className="bigtitle-title">Avisos / Pendências</h2>
              <p>Some Text goes here, some text goes here, some text goes here, some text goes here.</p>
              <button href="#" className="info-link">Mais...</button>
            </div>
            <div className="section">
              <h2>Outros</h2>
              <p>Some Text goes here, some text goes here, some text goes here, some text goes here.</p>
              <button href="#" className="info-link">Mais...</button>
            </div>
      </div>
  </div>
  </div>)
  /* const [users, setUsers] = useState([]);
  
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
  ); */
};

export default Home;
