import React, { useEffect, useState} from "react"; 
/*import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../helper/token';
import { doGet } from "../../helper/ApiHelper"; */
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { getWeek ,format, getDay } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'


import axios from 'axios';

import {getSavedIdLocal} from '../../helper/token';

import './stylecardreset.css';
import './styles.css';
import './stylecard.css';

const API_BASE = process.env.REACT_APP_API_URL;

const Home = () => {

const user_id = getSavedIdLocal();
const [userOrdens, setUserOrdens] = useState([]);

const hoje = format(new Date(), 'eeee, dd/MM/yyyy',{locale:ptBR});
const hojeUS = format(new Date(), 'yyyy-MM-dd',{locale:enUS});
const semanaAtual = getWeek(new Date());
const result = getDay(new Date(), 'dd/MM/yyyy',{locale:ptBR})
let programOfTheDay = [];

useEffect(() => {
  if (user_id){
  axios.get(`${API_BASE}prog/ordem/busca/${semanaAtual}`, {params: {
    user_id: user_id}
  })
  .then((ordensUsuarios) => {
    setUserOrdens(ordensUsuarios.data);
  }).catch((error) => {
  console.log(error, "error");
  })}       
           
}, [user_id, semanaAtual]);

  try {
  userOrdens.forEach (ListOrdensPeloDia => {
    if (ListOrdensPeloDia.ordems.length !== 0){
        for (let days of ListOrdensPeloDia.ordems){
          const data = ListOrdensPeloDia.data.split("T",1);
          programOfTheDay.push(
                    {
                        data: data[0],
                        text: days.text,
                        prog_id: days.programacao_id,
                        numero: days.numero,
                        osId: days.id
                    })
         }
    }
  });
  }catch (error) {
    return console.log(error, "não tem prog")
  };
  
  const showUserProgram = programOfTheDay.map((showprog) => {
    if (hojeUS === showprog.data){
      const osId = showprog.osId;
      return <li key={osId}>
      <strong>Numero OS:</strong> {showprog.numero} <br></br>
      <strong>Descrição da ordem:</strong> {showprog.text} <br></br> 
      </li>;
    }
    return null
  });
console.log(programOfTheDay)

  return(
    <div className="background">
      {getSavedIdLocal() ?
      <div className="body">
        <header>
      <h1 className="title">{hoje} </h1>
      <h2 className="subtitle">Semana:{semanaAtual}</h2>
        <div className="options">
          <button href="#" className="options-link">Programação</button>
          <h3>|</h3>
          <button href="#2" className="options-link">Sobreaviso</button>
          <h3>|</h3>
          <button href="#3" className="options-link">Transporte</button>
        </div>
        </header>
        <div className="main">
              <div className="section">
                <h2>Programação Do Dia</h2>
                <p>{showUserProgram}</p>
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
      </div> : <p className="await-login">Desenvolvido para navegador Chrome</p>}
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
