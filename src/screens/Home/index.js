import React, { useEffect, useState} from "react"; 
/* import { Link } from "react-router-dom"; */
import {FiMapPin} from "react-icons/fi"
import logoCalendario from "../../assets/calendar.svg";
/* import { getWeek ,format, getDay, isBefore, parseISO, isWithinInterval, subMinutes, addMinutes, isMonday, isSunday, isTuesday, isWednesday, isThursday, isFriday, isSaturday } from 'date-fns' */
import { getWeek ,format, isBefore, parseISO, isWithinInterval, subMinutes, 
addMinutes, isMonday, isSunday, isTuesday, isWednesday, isThursday, isFriday, isSaturday,
getDaysInMonth, getMonth, getYear } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

import axios from 'axios';

import {getSavedIdLocal, getSavedUserLocal} from '../../helper/token';
//import {getSavedIdLocal} from '../../helper/token';

import './stylecardreset.css';
import './styles.css';
import './stylecard.css';
import './Calendar.css';

const API_BASE = process.env.REACT_APP_API_URL;

const Home = () => {

const user_name = getSavedUserLocal();
const user_id = getSavedIdLocal();
const [viewProgUser, setViewProgUser] = useState(null);
const [anotherUser, setAnotherUser] = useState(null);
const [userOrdens, setUserOrdens] = useState([]);
const [userOrdensWeek, setUserOrdensWeek] = useState([]);
const [userSobreaviso, setUserSobreaviso] = useState([]);
const [fullSobreaviso, setFullSobreaviso] = useState([]);
const [listUserToChange, setListUserToChange] = useState([]);
const [programDoDia, setProgramDoDia] = useState([]);
const [show, setShow] = useState(false);
const [show2, setShow2] = useState(false);
const [show3, setShow3] = useState(false);
const [show4, setShow4] = useState(false);
const [show5, setShow5] = useState(false);
const [show6, setShow6] = useState(false);
const [show7, setShow7] = useState(false);
const [value, onChange] = useState(new Date());
const [showCalendar, setShowCalendar] = useState(false);
const [iw41Status, setIw41Status] = useState(false);
const [iw41, setIw41] = useState();

//pega o value e passa para o formato date-fns
const hoje = format(value, 'eeee, dd/MM/yyyy',{locale:ptBR});
const hojeBR = format(value, 'dd/MM/yyyy',{locale:ptBR});
const hojeBRshort = format(value, 'dd/MM',{locale:ptBR});
const hojeDiaSemana = format(value, 'eeee',{locale:ptBR});
const hojeUS = format(value, 'yyyy-MM-dd',{locale:enUS});
const semanaAtual = getWeek(value);

/* console.log(hojeUS, "mes:", getMonth(parseISO(hojeUS)),"ultimo dia:", 
getDaysInMonth(parseISO(hojeUS)),"ano:", getYear(parseISO(hojeUS))) */
/* const result = getDay(value, 'dd/MM/yyyy',{locale:ptBR}) */
let programOfTheDay = [];
let progAllOfTheDay = [];
let sobreavisoMes= [];

//abre programação da semana
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);
const handleClose3 = () => setShow3(false);
const handleShow3 = () => setShow3(true);
const handleClose4 = () => setShow4(false);
const handleShow4 = () => {
  
  if(programDoDia.length !== 0 && anotherUser === null)
  {
    setShow4(true)
  }
  else if(programDoDia.length !== 0 && anotherUser === user_name)
  {
    setShow4(true)
  }
};
const handleClose5 = () => setShow5(false);
const handleShow5 = () => {
  /* handleClickSobreaviso(); */
  setShow5(true)
};

const handleClose6 = () => setShow6(false);
const handleShow6 = () => setShow6(true);
const handleClose7 = () => setShow7(false);
const handleShow7 = () => setShow7(true);

const handleClickCalendar = ()=> setShowCalendar(!showCalendar);

let oldestProgDate = 0;
let oldestProgDateMaisUm = 0;
let oldestProgDateMenosUm = 0;

let oldestProgAllDate = 0;
let oldestProgAllDateMaisUm = 0;
let oldestProgAllDateMenosUm = 0;

/* console.log(getSavedIdLocal(),'id', user_id, 'sem:',semanaAtual, 'dia sem',result) */

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

//para filtrar somente um dia de cada vez
useEffect(() => {
  if (user_id){
  axios.get(`${API_BASE}prog/semana/busca/${semanaAtual}`)
  .then((ordensUsuarios) => {
    setUserOrdensWeek(ordensUsuarios.data);
  }).catch((error) => {
  console.log(error, "error");
  })}       

}, [user_id, semanaAtual]);

useEffect(() => {
  axios.get(`${API_BASE}users`)
  .then((ordensUsuarios) => {
    setListUserToChange(ordensUsuarios.data);
  }).catch((error) => {
  console.log(error, "error");
  })
}, []);

useEffect(() => {
  axios.get(`${API_BASE}prog/sobreaviso/busca/data`, {params: {
    date: hojeBR}
  })
  .then((ordensUsuarios) => {
    setUserSobreaviso(ordensUsuarios.data);
  }).catch((error) => {
  console.log(error, "error");
  })

  axios.get(`${API_BASE}prog/sobreaviso`)
  .then(function (response) {
    setFullSobreaviso(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  
}, [hojeBR]);

useEffect(() => {
  setShowCalendar(false);
}, [value]);

useEffect(() => {
  async function fetch(){
  if (viewProgUser){
  await axios.get(`${API_BASE}prog/dia/busca/${hojeUS}`, {params: {
    user_id: viewProgUser}
  })
  .then((programacao) => {
    /* console.log(programacao.data) */
    setProgramDoDia(programacao.data);
  }).catch((error) => {
  console.log(error, "error");
  })
}}
fetch()
}, [hojeUS,user_id, iw41Status, viewProgUser, iw41]);

/* console.log(programDoDia) */
/* console.log(viewProgUser) */
/*console.log(user_id, hojeUS) */

useEffect(() => {
  if(programDoDia.length !== 0){
    /* console.log(programDoDia) */
    function handleStatusChange(iw41) {
      setIw41(iw41);
    }
    if (verificaApontamento(programDoDia) === "true"){ 
      handleStatusChange(true);
      /* console.log("thumbsUp") */
    }else if(verificaApontamento(programDoDia) === "false") {
      /* console.log("thumbsDown") */
      handleStatusChange(false);
    }
  }else{
    setIw41(null)
  }
}, [programDoDia, iw41]);

async function handleClickIw41(bool){
  const statusApont = bool;
  const prog_id = verificaProgId(programDoDia);
  await axios.post(`${API_BASE}prog/apontamento/${prog_id}`, {
    apontamento: statusApont,
  })
  .then(function (response) {
    setIw41Status(!iw41Status);
    handleClose4();
  })
  .catch(function (error) {
    console.log(error);
  });
}

  fullSobreaviso.filter(function(sobreaviso) {
    const monthParsed = ((getMonth(parseISO(hojeUS)))+1).toString();
    let zero = "";
    if (monthParsed<=9){
      zero="0"
    }
    let str = ("01/"+zero+monthParsed+"/"+(getYear(parseISO(hojeUS))).toString());
    let mes = str.includes("/"+zero+monthParsed+"/", 2);
    const total = getDaysInMonth(parseISO(hojeUS))
    
    if (mes){
      let count=0;
      for (let i=1; i<=total; i++){
        if(i>=1 && i<=9){
          count = "0"+i.toString();
        }
        else{
          count = i.toString();
        }    
        /* console.log(sobreaviso.date, (count+"/"+zero+monthParsed+"/"+(getYear(parseISO(hojeUS))).toString())) */
          if (sobreaviso.date === (count+"/"+zero+monthParsed+"/"+(getYear(parseISO(hojeUS))).toString())){
            const data = sobreaviso.date.slice(0,5);
            sobreavisoMes.push(
            {
            index: count,
            data: data,
            tecAreaUm:sobreaviso.tecAreaUm,
            tecAreaDois:sobreaviso.tecAreaDois,
            tecAreaSete:sobreaviso.tecAreaSete,
            telefone:sobreaviso.telefone,
          })
        }
      }
    return sobreavisoMes
  }
    else{
    return null;}
  });

/* console.log("iw41:", iw41)
console.log(programDoDia) */
function verificaApontamento(ProgramDoDia){
  for (let program of ProgramDoDia){
    return program.apontamento
  }
}


function verificaProgId(ProgramDoDia){
  for (let program of ProgramDoDia){
    return program.programacao_id
  }
}

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
            /* console.log(oldestProgDate) */
          }
        } 
      });
    }catch (error) {
      return console.log(error, "não tem prog")
    };

    try {//oldestprog que vai na principal
      userOrdensWeek.forEach (ListOrdensPeloDia => {
        if (ListOrdensPeloDia.ordems.length !== 0){
              for (let oldest of ListOrdensPeloDia.ordems){
                if (oldestProgAllDate === 0){
                  oldestProgAllDate = oldest.created_at;
                }
                else if(isBefore((parseISO(oldestProgAllDate)), (parseISO(oldest.created_at)))){
                  oldestProgAllDate = oldest.created_at;
                } 
                /* console.log(oldestProgAllDate) */
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
            programOfTheDay.push(
                      {
                          data: data[0],
                          text: days.text,
                          prog_id: days.programacao_id,
                          numero: days.numero,
                          osId: days.id,
                          numero_extra: days.numero_extra,
                          apoio: ListOrdensPeloDia.apoio,
                          local: ListOrdensPeloDia.local,
                          transporte: ListOrdensPeloDia.transporte
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
      /* console.log(showprog.numero_extra, showprog.numero) */
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li></li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li></li>}
        </ul>
      </div>;
    }
    return null
  });
  //array para ficar somente um transporte
  let isTodayTransport = [];
  const showUserProgramTransport = programOfTheDay.map((showprog) => {
    if (hojeUS === showprog.data){
      isTodayTransport.push(showprog.transporte)
      return showprog.transporte
    }
    else {
      return null
    };
  });
  
  const first =  function(array, n) {
    if (array == null) 
    return void 0;
  if (n == null) 
    return array[0];
  if (n < 0)
    return [];
  return array.slice(0, n);
};

  let sunday = null; let monday = null; let tuesday = null; 
  let wednesday = null; let thusday = null; let friday = null; let saturday = null; 

  // programação do dia retirando as datas repetidas
  const showUserProgramDailySunday = programOfTheDay.map((showprog) => {
    //if (showprog.numero_extra){
      //tem que dividir o numero extra a cada 8 caracteres dependendo de quantas OS´s tem
   // }

    if (isSunday((parseISO(showprog.data)))){
      sunday = showprog.data;
    }else if (isMonday((parseISO(showprog.data)))){
      monday = showprog.data;
    }else if (isTuesday((parseISO(showprog.data)))){
      tuesday = showprog.data;
    }else if (isWednesday((parseISO(showprog.data)))){
      wednesday = showprog.data;
    }else if (isThursday((parseISO(showprog.data)))){
      thusday = showprog.data;
    }else if (isFriday((parseISO(showprog.data)))){
      friday = showprog.data;
    }else if (isSaturday((parseISO(showprog.data)))){
      saturday = showprog.data;
    }
    if (sunday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  // programação do dia retirando as datas repetidas
  const showUserProgramDailyMonday = programOfTheDay.map((showprog) => {
    
    if (monday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  // programação do dia retirando as datas repetidas
  const showUserProgramDailyTuesday = programOfTheDay.map((showprog) => {
    
    if (tuesday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  // programação do dia retirando as datas repetidas
  const showUserProgramDailyWednesday = programOfTheDay.map((showprog) => {
    
    if (wednesday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  // programação do dia retirando as datas repetidas
  const showUserProgramDailyThusday = programOfTheDay.map((showprog) => {
    
    if (thusday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  // programação do dia retirando as datas repetidas
  const showUserProgramDailyFriday = programOfTheDay.map((showprog) => {
    
    if (friday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  // programação do dia retirando as datas repetidas
  const showUserProgramDailySaturday = programOfTheDay.map((showprog) => {
    
    if (saturday === showprog.data){
      const osId = showprog.osId;
      return <div className="section-text" key={osId}>
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
    }
    return null
  });

  const areaUm = userSobreaviso.map((showSobreavisoAreaUm) =>{
    return showSobreavisoAreaUm.tecAreaUm
  })
  
  const areaSete = userSobreaviso.map((showSobreavisoAreaSete) =>{
    return showSobreavisoAreaSete.tecAreaSete
  })

  //precisa acertar para mostrar a programação completa do dia para todos os usuários
  userOrdensWeek.forEach( (showProgAll) =>{ 
      if (showProgAll.ordems.length !== 0){
        for (let days of showProgAll.ordems){
          const data = showProgAll.data.split("T",1);
            oldestProgAllDateMaisUm = addMinutes((parseISO(oldestProgAllDate)), 1)
            oldestProgAllDateMenosUm = subMinutes((parseISO(oldestProgAllDate)), 1)
             if(isWithinInterval((parseISO(days.created_at)), { start: oldestProgAllDateMenosUm, end: oldestProgAllDateMaisUm})){
              if(data[0] === hojeUS){
              progAllOfTheDay.push(
                      {
                          data: data[0],
                          text: days.text,
                          prog_id: days.programacao_id,
                          numero: days.numero,
                          osId: days.id,
                          numero_extra: days.numero_extra,
                          apoio: showProgAll.apoio,
                          local: showProgAll.local,
                          transporte: showProgAll.transporte,
                          user_id: days.user_id
                      })
                    }
                     
              } 
        }
    }
  });
  /* console.log(listUserToChange) */
  let usernameAnterior = false;
  let username = "";
  //PRECISA ACERTAR PARA O CASO DE MAIS DE UMA PROG NO BD
  const showUserProgAll = progAllOfTheDay.map((showprog) => {
    
    for (let item of listUserToChange){
    if (showprog.user_id === item.id){
      if (username === item.username){
        usernameAnterior = true;
      }else {
        usernameAnterior = false;
      }
      username = item.username;
      const osId = showprog.osId;
      return <div className="section-daily-fullProg" key={osId}>
        {!usernameAnterior ? <hr></hr> : null}
        <ul className="section-daily-fullProg-li">
          {!usernameAnterior ? <li>{username}</li> : null}
        </ul>
        {!usernameAnterior ? <hr></hr> : null}
        <ul >
          {showprog.local !== "0" ? <li>Local: {showprog.local}</li> : <li>Local: </li>}
          {showprog.numero_extra ? <li>Número OS: {showprog.numero} / {showprog.numero_extra}</li> : <li>Número OS: {showprog.numero}</li>}
          <li>Descrição: {showprog.text}</li>
          {showprog.apoio !== "0" ? <li>Apoio: {showprog.apoio}</li> : <li>Apoio: </li>}
          {showprog.transporte !== "0" ? <li>Transporte: {showprog.transporte}</li> : <li>Transporte: </li>}
        </ul>
      </div>;
      
    }}
  return null;      
  });
let diaAnterior = [];
let validaReturn = true;
const showTransporteOfTheWeek = programOfTheDay.map((showtransp)=>{
  const osId = showtransp.osId;
  
  diaAnterior.forEach((verificaOsDias) =>{
    if (verificaOsDias.dia === showtransp.data){
      validaReturn = false;
    }
    else{
      validaReturn = true;
    }
  })

  if (validaReturn){
  diaAnterior.push ({dia: showtransp.data});
  return <div key={osId}>
        <ul >
          {showtransp.data}<br></br>
          {showtransp.transporte !== "0" ? <li>Transporte: {showtransp.transporte}</li> : <li>Transporte: </li>}
        </ul>
       </div>}
  else{
    return <div key={osId}></div>
  }
});
/* console.log(areaUm, areaSete) */
/* console.log('programday',programOfTheDay, 'showuser', showUserProgram, 'username', user_name, 'progCompleta', showUserProgramCompleta) */

  return(
    <div className="background">
      {getSavedIdLocal() ?
      <div className="body">
        <header>
      <h1 className="title">{hoje} </h1>
      <h2 className="subtitle">Semana: {semanaAtual}</h2>
      <div className="section-calendario">
        <div>
        <img className="section-img" src={logoCalendario} alt="calendario completo" onClick={()=>handleClickCalendar()}></img>
        </div>
        <div id="calendar">
        {showCalendar ? <Calendar
          onChange={onChange}
          value={value}
        /> : ""}
        </div>
    </div>
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
                <h2 className="click_h2" onClick={handleShow3}>Programação de {hojeDiaSemana}</h2>
                <span className="select-iw41" onClick={handleShow4}>IW41 realizado?</span>{verificaApontamento(programDoDia) === "true" ? <GoThumbsup></GoThumbsup>:<GoThumbsdown></GoThumbsdown>}
                {showUserProgram.length ? showUserProgram : <div className="section-text"><Spinner animation="border" role="status"></Spinner> Carregando...</div>}
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
                        <div className="one-two">{hojeBRshort}</div>
                      <div className="two">Área 1 e 2</div>
                        <div className="two-two">{userSobreaviso.length ? <div>{areaUm}</div>: "--"}</div>
                      <div className="three">Área 7</div>
                        <div className="Three-two">{userSobreaviso.length ? <div>{areaSete}</div>: "--"}</div>
                </div>
                {/* <Logo
                  alt=""
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                /> */}
                {/* <img className="section-img" src="Logo" alt="important graph"></img> */}
                <button href="#" className="info-link" onClick={handleShow5}>Mais...</button>
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
                        <div className="one-twoMot">{hojeBRshort}</div>
                      <div className="twoMot">Semana</div>
                        <div className="two-twoMot">{hojeDiaSemana}</div>
                      <div className="threeMot">Motorista</div>
                        <div className="Three-twoMot">{showUserProgramTransport.length ? <div>{first(isTodayTransport)}</div>: "--"}</div>
                      <div className="fourMot">Tel: (21) --</div>
                        <div className="four-twoMot"></div>
                </div>
                <button href="#" className="info-link" onClick={handleShow6}>Mais...</button>
              </div>
              <div id="matriculas" className="section">
                <h2>Infomações de matrículas</h2>
                  <div className="divisao-matriculas-marte">
                  <p>Matrícula dos Martes:</p>
                  <ul>
                    <li>Sérgio Braz: 70004502</li>
                    <li className="li-centro-trab">Centro trab. Cal2t</li>
                    <li>Ronaldo: 49728663</li>
                    <li>Jeanilson: 49728872</li>
                    <li className="li-centro-trab">Centro trab. Mec2t</li>
                    <li>Wescley: 41037730</li>
                    <li>Jorge Bento: 49727525</li>
                    <li className="li-centro-trab">Centro trab. Ins2t</li>
                    <li>Cid: 70795725</li>
                  </ul>
                  </div>
                <button className="info-link" href="#" onClick={handleShow2}>Mais...</button>
              </div>
              <div id="pendencias" className="section">
                <h2 className="bigtitle-title">Códigos das estações</h2>
                <table className="table_address">
                  <thead>
                  <tr >
                    <th className="th_address">Instalação</th>
                    <th className="th_address">Código do cliente</th>
                    <th className="th_address">Código da instalação</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr >
                    <td className="td_address">Guapimirim</td>
                    <td className="td_address">ENEL 6151688-0</td>
                    <td className="td_address">33366043</td>
                  </tr>
                  
                  <tr className="tr_odd_address">
                    <td className="td_address">Guapimirim</td>
                    <td className="td_address">ENEL 2588497-2</td>
                    <td className="td_address">-</td>
                  </tr>
                  
                  <tr >
                    <td className="td_address">Anel de Gás</td>
                    <td className="td_address">ENEL 1796463-6</td>
                    <td className="td_address">-</td>
                  </tr>
                  <tr className="tr_odd_address"> 
                    <td className="td_address">Termorio</td>
                    <td className="td_address">ENEL 3228550-7</td>
                    <td className="td_address">2000186</td>
                  </tr>
                  <tr >
                    <td className="td_address">Manifold</td>
                    <td className="td_address">ENEL 3734545-1</td>
                    <td className="td_address">28855959</td>
                  </tr>
                  <tr className="tr_odd_address">
                    <td className="td_address">PE Caxias</td>
                    <td className="td_address">Light 20006137</td>
                    <td className="td_address">420846979</td>
                  </tr>
                  </tbody>
                </table>
                <button href="#" className="info-link" onClick={handleShow7}>Mais...</button>
              </div>
              <div id="outros" className="section">
                <h2>Estações</h2>
                <table className="table_address">
                  <thead>
                  <tr >
                    <th className="th_address">Instalação</th>
                    <th className="th_address">Endereço</th>
                    <th className="th_address">Localização</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr >
                    <td className="td_address">Termorio 1 e 2</td>
                    <td className="td_address">R. Hualaga, 317 - tp 110</td>
                    <td className="td_address">
                      <a href="http://maps.google.com/maps/place/-22.713021,-43.261765" target={"_blank"} rel="noopener noreferrer"> 
                      <FiMapPin size={16} color="#E02041" />
                      Gmaps
                      </a>
                    </td>
                  </tr>
                  
                  <tr className="tr_odd_address">
                    <td className="td_address">Manifold</td>
                    <td className="td_address">R. Elisa Maria</td>
                    <td className="td_address">
                      <a href="http://maps.google.com/maps/place/-22.707641301717008,-43.24036893378129" target={"_blank"} rel="noopener noreferrer"> 
                      <FiMapPin size={16} color="#E02041" />
                      Gmaps
                      </a></td>
                  </tr>
                  
                  <tr >
                    <td className="td_address">Guapimirim</td>
                    <td className="td_address">Jardim Anapolis- tp 17</td>
                    <td className="td_address">
                      <a href="http://maps.google.com/maps/place/-22.59866083144034,-42.92405932221116" target={"_blank"} rel="noopener noreferrer"> 
                      <FiMapPin size={16} color="#E02041" />
                      Gmaps
                      </a></td>
                  </tr>
                  <tr className="tr_odd_address"> 
                    <td className="td_address">Duque de Caxias</td>
                    <td className="td_address">Av. Djalma Dutra, S/N - tp 142</td>
                    <td className="td_address">
                      <a href="http://maps.google.com/maps/place/-22.693816,-43.300165" target={"_blank"} rel="noopener noreferrer"> 
                      <FiMapPin size={16} color="#E02041" />
                      Gmaps
                      </a></td>
                  </tr>
                  <tr >
                    <td className="td_address">Anel de Gás</td>
                    <td className="td_address">Av. Fabor, 300 - tp 118</td>
                    <td className="td_address">
                      <a href="http://maps.google.com/maps/place/-22.715101,-43.263209" target={"_blank"} rel="noopener noreferrer"> 
                      <FiMapPin size={16} color="#E02041" />
                      Gmaps
                      </a></td>
                  </tr>
                  </tbody>
                </table>
                <button href="#" className="info-link">Mais...</button>
              </div>
        </div>
        <Modal show={show7} onHide={handleClose7}>
        <Modal.Header closeButton>
          <Modal.Title>Códigos das estações</Modal.Title>
        </Modal.Header>
              <Modal.Body>
              <table >
                  <thead>
                  <tr className="tr_odd_address">
                    <th className="th_address">Instalação</th>
                    <th className="th_address">Código do cliente</th>
                    <th className="th_address">Código da instalação</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="td_address">VTC-14 (Colégio-Papucaia)</td>
                    <td className="td_address">CERCI 166802</td>
                    <td className="td_address">medidor 3592</td>
                  </tr>
                  <tr className="tr_odd_address">
                    <td className="td_address">VTC-16 Magé</td>
                    <td className="td_address">5210697-7</td>
                    <td className="td_address">3194002</td>
                  </tr>
                  <tr>
                    <td className="td_address">Scrapper Gasduc</td>
                    <td className="td_address">ENEL 1502068-0</td>
                    <td className="td_address">2125593</td>
                  </tr>
                  </tbody>
                </table>
              </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={()=> handleClickOnAnotherUser(document.getElementById('SeleçãoUsuario').value)}>
            Alterar
          </Button> */}
          <Button variant="secondary" onClick={handleClose7}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Modal show={show6} onHide={handleClose6}>
        <Modal.Header closeButton>
          <Modal.Title>Transporte da Semana</Modal.Title>
        </Modal.Header>
              <Modal.Body><div /* className="divisao-matriculas-proprio" */>
                  <ul>
                    <li>{showTransporteOfTheWeek}</li>
                  </ul>
                  </div>
              </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={()=> handleClickOnAnotherUser(document.getElementById('SeleçãoUsuario').value)}>
            Alterar
          </Button> */}
          <Button variant="secondary" onClick={handleClose6}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        {/* modal mais info. importantes */}
        <Modal size= "sm" show={show5} onHide={handleClose5}>
        <Modal.Header closeButton>
          <Modal.Title>Sobreaviso do Mês</Modal.Title>
        </Modal.Header>
              <Modal.Body>
                <div className="class-sobre">
                <div > Dia </div> <div>Área 1 </div> <div> Área 2 </div> <div>Área 7</div>
                </div>
              {sobreavisoMes.map(sob => 
              <div key= {sob.index} className="class-sobre-text">
              <div className="center" >{sob.data}</div>
              <div>{sob.tecAreaUm}</div>
              <div>{sob.tecAreaDois}</div>
              <div>{sob.tecAreaSete}</div>
              </div>
              )
              }
              </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose5}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal size= "sm" show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>Apontamento</Modal.Title>
        </Modal.Header>
              <Modal.Body>
                Realizado apontamento do dia {hojeBR} ?
              </Modal.Body>
        <Modal.Footer>
           <Button variant="primary" onClick={()=>handleClickIw41("true")}>
            Sim
          </Button>
          <Button variant="primary" onClick={()=>handleClickIw41("false")}>
            Não
          </Button>
          <Button variant="secondary" onClick={handleClose4}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Programação do Dia Completa</Modal.Title>
        </Modal.Header>
              <Modal.Body>
                <div className="section-daily">{hoje}<br></br></div>
                {showUserProgAll}
                
              </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={()=> handleClickOnAnotherUser(document.getElementById('SeleçãoUsuario').value)}>
            Alterar
          </Button> */}
          <Button variant="secondary" onClick={handleClose3}>
          Fechar
          </Button>
        </Modal.Footer>
      </Modal>
        <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Infomações de matrículas</Modal.Title>
        </Modal.Header>
              <Modal.Body><div className="divisao-matriculas-proprio">
                  <ul>Matrícula dos Próprios:</ul>
                  <ul>
                    <li>Daniel: 4925</li>
                    <li>José Rodrigo: 5180</li>
                    <li className="li-centro-trab">Centro trab. Ins2p</li>
                    <li>Affonso: 2475</li>
                    <li>Boechat: 7420</li>
                    <li>Davi: 3905</li>
                    <li>Wallace: 6747</li>
                    <li className="li-centro-trab">Centro trab. Aut2p</li>
                    <li>Caio: 3859</li>
                    <li className="li-centro-trab">Centro trab. Mec2p</li>
                    <li>Fábio Bertuzzi: 5026</li>
                    <li>Jorge: 5825</li>
                    <li className="li-centro-trab">Centro trab. Ele2p</li>
                    <li>Manhães: 5711</li>
                  </ul>
                  </div></Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={()=> handleClickOnAnotherUser(document.getElementById('SeleçãoUsuario').value)}>
            Alterar
          </Button> */}
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Programação da Semana</Modal.Title>
        </Modal.Header>
              <Modal.Body>
              <div className="section-daily">Segunda-feira<br></br>{monday !== null ? monday : ""}</div>
              {showUserProgramDailyMonday}
              <hr></hr>
              <div className="section-daily">Terça-feira<br></br>{tuesday !== null ? tuesday : ""}</div>
              {showUserProgramDailyTuesday}
              <hr></hr>
              <div className="section-daily">Quarta-feira<br></br>{wednesday !== null ? wednesday : ""}</div>
              {showUserProgramDailyWednesday}
              <hr></hr>
              <div className="section-daily">Quinta-feira<br></br>{thusday !== null ? thusday : ""}</div>
              {showUserProgramDailyThusday}
              <hr></hr>
              <div className="section-daily">Sexta-feira<br></br> {friday !== null ? friday : ""}</div>
              {showUserProgramDailyFriday}
              <hr></hr>
              <div className="section-daily">Sábado<br></br>{saturday !== null ? thusday : ""}</div>
              {showUserProgramDailySaturday}
              <hr></hr>
              <div className="section-daily">Domingo<br></br>{sunday !== null ? thusday : ""}</div>
              {showUserProgramDailySunday}
              </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={()=> handleClickOnAnotherUser(document.getElementById('SeleçãoUsuario').value)}>
            Alterar
          </Button> */}
          <Button variant="secondary" onClick={handleClose}>
          Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      </div> : <p className="await-login">Desenvolvido para navegador Chrome</p>}
  </div>)
};

export default Home;
