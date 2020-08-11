import React, { useEffect, useState} from "react"; 
/*import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../helper/token';
import { doGet } from "../../helper/ApiHelper"; */
/* import { ReactComponent as Logo } from "../../assets/logo.svg"; */
import { getWeek ,format, getDay } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import {getSavedIdLocal, getSavedUserLocal} from '../../helper/token';

import './stylecardreset.css';
import './styles.css';
import './stylecard.css';

const API_BASE = process.env.REACT_APP_API_URL;

const Home = () => {

const user_id = getSavedIdLocal();
const user_name = getSavedUserLocal();
const [userOrdens, setUserOrdens] = useState([]);
const [show, setShow] = useState(false);

const hoje = format(new Date(), 'eeee, dd/MM/yyyy',{locale:ptBR});
const hojeBR = format(new Date(), 'dd/MM',{locale:ptBR});
const hojeDiaSemana = format(new Date(), 'eeee',{locale:ptBR});
const hojeUS = format(new Date(), 'yyyy-MM-dd',{locale:enUS});
const semanaAtual = getWeek(new Date());
const result = getDay(new Date(), 'dd/MM/yyyy',{locale:ptBR})
let programOfTheDay = [];
console.log(getSavedIdLocal(),'id', user_id, 'sem:',semanaAtual, 'dia sem',result)

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

function onLinkClick(id) {
  const elementId = id;
  document.getElementById(`${elementId}`).scrollIntoView({behavior: "smooth"});
}

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

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
      return <div className="section-text" key={osId}>
        <ul >
          <li>Número OS: {showprog.numero}</li>
          <li>Descrição: {showprog.text}</li>
        </ul>
      </div>;
    }
    return null
  });

  const showUserProgramCompleta = programOfTheDay.map((showprog) => {
      const osId = showprog.osId;
      console.log(showprog)
      return <div className="section-text" key={osId}>
        <ul>
          <li>Data: {showprog.data}</li>
          <li>Número OS: {showprog.numero}</li>
          <li>Descrição: {showprog.text}</li>
        </ul>
      </div>;
  });

console.log('programday',programOfTheDay, 'showuser', showUserProgram, 'username', user_name, 'progCompleta', showUserProgramCompleta)

  return(
    <div className="background">
      {getSavedIdLocal() ?
      <div className="body">
        <header>
      <h1 className="title">{hoje} </h1>
      <h2 className="subtitle">Semana: {semanaAtual}</h2>
        <div className="options">
          <button href="#programacaoDoDia" onClick={()=> onLinkClick("programacaoDoDia")} className="options-link">Programação</button>
          <h3>|</h3>
          <button href="#sobreaviso" onClick={()=> onLinkClick("sobreaviso")} className="options-link">Sobreaviso</button>
          <h3>|</h3>
          <button href="#transporte" onClick={()=> onLinkClick("transporte")} className="options-link">Transporte</button>
        </div>
        </header>
        <div className="main">
              <div id="programacaoDoDia" className="section">
                <h2>Programação de {hojeDiaSemana}</h2>
                {showUserProgram.length ? showUserProgram : <div className="section-text">Não há programação cadastrada</div>}
                <button href="#" className="info-link" onClick={handleShow} >Mais...</button>
              </div>
              <div id="sobreaviso" className="section">
                <h2>Sobreaviso</h2>
                <div className="wrapper">
                      <div className="one">{hojeDiaSemana}</div>
                        <div className="one-two">{hojeBR}</div>
                      <div className="two">Área 1 e 2</div>
                        <div className="two-two">--</div>
                      <div className="three">Área 7</div>
                        <div className="Three-two">--</div>
                </div>
                {/* <Logo
                  alt=""
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                /> */}
                {/* <img className="section-img" src="Logo" alt="important graph"></img> */}
                <button href="#" className="info-link">Mais...</button>
              </div>
              <div id="transporte"className="section">
                <h2>Transporte</h2>
                {/* <Logo
                  alt=""
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                /> */}
                <div className="wrapperMot">
                      <div className="oneMot">Dia</div>
                        <div className="one-twoMot">{hojeBR}</div>
                      <div className="twoMot">Semana</div>
                        <div className="two-twoMot">{hojeDiaSemana}</div>
                      <div className="threeMot">Motorista</div>
                        <div className="Three-twoMot">--</div>
                      <div className="fourMot">Tel: (21) --</div>
                        <div className="four-twoMot"></div>
                </div>
                <button href="#" className="info-link">Mais...</button>
              </div>
              <div id="matriculas" className="section">
                <h2>Dados Usuários</h2>
                <p>Matrícula dos Martes:</p>
                <p>Matrícula dos Próprios:</p>
                <button className="info-link" href="#" >Mais...</button>
              </div>
              <div id="pendencias" className="section">
                <h2 className="bigtitle-title">Avisos / Pendências</h2>
                <p>Sem Avisos e pendências</p>
                <button href="#" className="info-link">Mais...</button>
              </div>
              <div id="outros" className="section">
                <h2>Outros</h2>
                <p>Não há outras informações </p>
                <button href="#" className="info-link">Mais...</button>
              </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Programação da Semana</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showUserProgramCompleta}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
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
