import React, { useEffect, useState} from "react"; 
//import { Link } from "react-router-dom";
/* import { ReactComponent as Logo } from "../../assets/logo.svg"; */
import { getWeek ,format, getDay, isBefore, parseISO, isWithinInterval, subMinutes, addMinutes } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import {getSavedIdLocal, getSavedUserLocal} from '../../helper/token';
//import {getSavedIdLocal} from '../../helper/token';

import './stylecardreset.css';
import './styles.css';
import './stylecard.css';

const API_BASE = process.env.REACT_APP_API_URL;

const Home = () => {

const user_name = getSavedUserLocal();
const user_id = getSavedIdLocal();
const [viewProgUser, setViewProgUser] = useState(null);
const [anotherUser, setAnotherUser] = useState(null);
const [userOrdens, setUserOrdens] = useState([]);
const [listUserToChange, setListUserToChange] = useState([]);
const [show, setShow] = useState(false);

const hoje = format(new Date(), 'eeee, dd/MM/yyyy',{locale:ptBR});
const hojeBR = format(new Date(), 'dd/MM',{locale:ptBR});
const hojeDiaSemana = format(new Date(), 'eeee',{locale:ptBR});
const hojeUS = format(new Date(), 'yyyy-MM-dd',{locale:enUS});
const semanaAtual = getWeek(new Date());
const result = getDay(new Date(), 'dd/MM/yyyy',{locale:ptBR})
let programOfTheDay = [];
console.log(getSavedIdLocal(),'id', user_id, 'sem:',semanaAtual, 'dia sem',result)

if(!viewProgUser && user_id){
  setViewProgUser(user_id);
}

useEffect(() => {
  if (user_id){
  axios.get(`${API_BASE}prog/ordem/busca/${semanaAtual}`, {params: {
    user_id: viewProgUser}
  })
  .then((ordensUsuarios) => {
    setUserOrdens(ordensUsuarios.data);
  }).catch((error) => {
  console.log(error, "error");
  })}       

}, [user_id, viewProgUser, semanaAtual]);

useEffect(() => {
  axios.get(`${API_BASE}users`)
  .then((ordensUsuarios) => {
    setListUserToChange(ordensUsuarios.data);
  }).catch((error) => {
  console.log(error, "error");
  })
}, []);

//scroll smooth
function onLinkClick(id) {
  const elementId = id;
  document.getElementById(`${elementId}`).scrollIntoView({behavior: "smooth"});
}

function handleClickList(name){
  for (let item of listUserToChange)
    if (item.username === name){
      setViewProgUser(item.id);
      setAnotherUser(item.username);
  }
}

//abre programação da semana
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
let oldestProgDate = 0;
let oldestProgDateMaisUm = 0;
let oldestProgDateMenosUm = 0;

try {//oldestprog que vai na principal
  userOrdens.forEach (ListOrdensPeloDia => {
    if (ListOrdensPeloDia.ordems.length !== 0){
          for (let oldest of ListOrdensPeloDia.ordems){
            if (oldestProgDate === 0){
              oldestProgDate = oldest.created_at;
            }
            else if(isBefore((parseISO(oldestProgDate)), (parseISO(oldest.created_at)))){
              oldestProgDate = oldest.created_at;
            } 
            console.log(oldestProgDate)
          }
        } 
      });
    }catch (error) {
      return console.log(error, "não tem prog")
    };

  try {//programação do dia que vai na principal
  userOrdens.forEach (ListOrdensPeloDia => {
    if (ListOrdensPeloDia.ordems.length !== 0){
        for (let days of ListOrdensPeloDia.ordems){
          const data = ListOrdensPeloDia.data.split("T",1);
          oldestProgDateMaisUm = addMinutes((parseISO(oldestProgDate)), 1)
          oldestProgDateMenosUm = subMinutes((parseISO(oldestProgDate)), 1)  
            if(isWithinInterval((parseISO(days.created_at)), { start: oldestProgDateMenosUm, end: oldestProgDateMaisUm})){
            console.log("chegou aqui")
            programOfTheDay.push(
                      {
                          data: data[0],
                          text: days.text,
                          prog_id: days.programacao_id,
                          numero: days.numero,
                          osId: days.id
                      })}
         }
    }
  });
  }catch (error) {
    return console.log(error, "não tem prog")
  };
  
  //como mostra a programação do dia
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

  //como mostra a programação completa
  const showUserProgramCompleta = programOfTheDay.map((showprog) => {
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul>
          <li>Data: {showprog.data}</li>
          <li>Número OS: {showprog.numero}</li>
          <li>Descrição: {showprog.text}</li>
        </ul>
      </div>;
  });

/* console.log('programday',programOfTheDay, 'showuser', showUserProgram, 'username', user_name, 'progCompleta', showUserProgramCompleta) */

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
                 <div className="menu-style">
                    <DropdownButton
                      id={`dropdown-button-drop-up`}
                      drop={'up'}
                      variant="secondary"
                      title={anotherUser ? anotherUser : user_name}
                    >
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="1" onClick={() => handleClickList("Affonso")}>Affonso</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="2" onClick={() => handleClickList("Boechat")}>Boechat</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="3" onClick={() => handleClickList("Caio")}>Caio</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="4" onClick={() => handleClickList("Daniel")}>Daniel</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="5" onClick={() => handleClickList("Davi")}>Davi</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="6" onClick={() => handleClickList("Fábio Bertuzzi")}>Fábio Bertuzzi</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="7" onClick={() => handleClickList("Jorge")}>Jorge</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="8" onClick={() => handleClickList("José Rodrigo")}>José Rodrigo</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="9" onClick={() => handleClickList("Manhães")}>Manhães</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="10" onClick={() => handleClickList("Wallace")}>Wallace</Dropdown.Item>
                    </DropdownButton>
                </div>
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
          {/* <Button variant="primary" onClick={()=> handleClickOnAnotherUser(document.getElementById('SeleçãoUsuario').value)}>
            Alterar
          </Button> */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      </div> : <p className="await-login">Desenvolvido para navegador Chrome</p>}
  </div>)
};

export default Home;
