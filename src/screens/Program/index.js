import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import api from '../../helper/api';
import axios from 'axios';
import {isAuthenticated, getToken} from '../../helper/token';

import './styles.css';
const API_BASE = process.env.REACT_APP_API_URL;



const Program = () => {

  const initialState = {
    page: 2,
    open: true,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,

  };

  const [person, setPerson] = useState(null);
  const [userOrdens, setUserOrdens] = useState([]);
  const [progSemana, setProgSemanas] = useState([]);
  const [pages, setPages] = useState(false);
  const [previewPages, setPreviewPages] = useState([]);
  const [nextPages, setNextPages] = useState([]);
  const [state, dispatch] = useReducer(pagesReducer, initialState);
  const { open, open2, open3, open4, open5, open6, open7 } = state;
  const { id } = useParams();
  const dateToFormat = new Date();
  let ListOrdensId = [];

  /* useEffect(() => {
    axios.get(`${API_BASE}users/${id}`)
          .then((response) => {
            setPerson(response.data);
          }).catch((error) => {
          console.log(error, "error");
          })             
          }, [id]); */
  
  useEffect(() => {
    console.log(isAuthenticated(), getToken())
    if (isAuthenticated()){
          api.get(`users/${id}`)
          .then((response) => {
            setPerson(response.data);
          }).catch((error) => {
          console.log(error, "error");
          })
    }
          }, [id]);

  useEffect(() => {
    if (id){
    axios.get(`${API_BASE}prog/ordem/`)
    .then((ordensUsuarios) => {
      setUserOrdens(ordensUsuarios.data);
    }).catch((error) => {
    console.log(error, "error");
    })}       
             
  }, [id]);

  useEffect(()=>{
    dispatch({ type: 'paginaInicial' });
  }, []);

  useEffect(() => {
    if (pages){
        axios.get(`${API_BASE}prog/semana/busca/${pages}`)
          .then((response) => {
          setProgSemanas(response.data);
          }).catch((error) => {
          console.log(error, "error");
          })}

          }, [pages]);

  if(!userOrdens || !userOrdens.length){
    return <h1>Loading...</h1>;
  }
  
  function pagesReducer(state, action) {
    
    switch (action.type) {
      case 'paginaInicial':
        return {...state, page: PrimeiraPage()};
      case 'next':
        return {...state, page: handlePagesNext()};
      case 'preview':
        return {...state, page: handlePagesPreview()};
      case 'open':
        if (state.open === true)
          return {...state, open: false};
        else {
          return {...state, open: true}
        }
      case 'open2':
        if (state.open2 === true)
          return {...state, open2: false};
        else {
          return {...state, open2: true}
        }
      case 'open3':
        if (state.open3 === true)
          return {...state, open3: false};
        else {
          return {...state, open3: true}
        }
      case 'open4':
        if (state.open4 === true)
          return {...state, open4: false};
        else {
          return {...state, open4: true}
        }
      case 'open5':
        if (state.open5 === true)
          return {...state, open5: false};
        else {
          return {...state, open5: true}
        }
      case 'open6':
        if (state.open6 === true)
          return {...state, open6: false};
        else {
          return {...state, open6: true}
        }
      case 'open7':
        if (state.open7 === true)
          return {...state, open7: false};
        else {
          return {...state, open7: true}
        }
      default:
        return new Error();
    }
    
  }

 function handlePagesNext(){
   if (pages>=2 && pages<=50){
    setPages(pages+1);
    setNextPages(nextPages+1);
    setPreviewPages(previewPages+1);}
    return pages+1;
  }

  function handlePagesPreview(){
    if (pages>2 && pages<=50){
    setPages(pages-1);
    setNextPages(nextPages-1);
    setPreviewPages(previewPages-1);}
    return pages-1;
  }

  function PrimeiraPage(){
    const {months} = dateDiff("2020-01-01");
    let firstPage = 2;
    if (months>1){
    firstPage = Math.trunc((months*30)/7)
    setPreviewPages(firstPage-1)
    setNextPages(firstPage+1)
    setPages(firstPage)}
    return firstPage
  }

  function dateDiff(date) {
    date = date.split('-');
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var yy = parseInt(date[0]);
    var mm = parseInt(date[1]);
    var dd = parseInt(date[2]);
    var years, months, days;
    // months
    months = month - mm;
    
    if (day < dd) {
        months = months - 1;
    }
    // years
    years = year - yy;
    if (month * 100 + day < mm * 100 + dd) {
        years = years - 1;
        months = months + 12;
    }
    // days
    days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));
    months += 1;
    return {years: years, months: months, days: days};
}

try {
        if(person === null){
          setPerson({id: 0});
        }//quando for fazer para aperecer todos tem que colocar um person.foreach aqui
        userOrdens.forEach (ListOrdensPeloId => { 
            const user = person.id;
              progSemana.forEach((program) => {
                const progId = program.id;
                if (ListOrdensPeloId.programacao_id === (parseInt(progId))){  
                  if (ListOrdensPeloId.user_id===(parseInt(user))){
                    const data = program.data.split("T",1);
                    const ddWeek= isWeekDay(data[0]);                  
                      ListOrdensId.push(
                        {
                          nome: person.username,
                          data: program.data,
                          text: ListOrdensPeloId.text,
                          numero: ListOrdensPeloId.numero,
                          osId: ListOrdensPeloId.id,
                          ddWeek: ddWeek
                        }                   
                      )
                  }   
                }
              });
        });
      
    }catch (error) {
      return console.log(error, "não tem prog")
    };
      
      const usersMonday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 2){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

      const usersTuesday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 3){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

      const usersWenesday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 4){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

      const usersThursday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 5){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

      const usersFriday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 6){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

      const usersSaturday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 1){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

      const usersSunday = ListOrdensId.map((ordens) => {
        if (ordens.ddWeek === 0){
        const id = ordens.osId;
        const data = ordens.data.split("T",1);  
          return <React.Fragment key={id}>
                <tr><td>{ordens.nome}</td>
                <td>{ordens.text}</td>
                <td>{ordens.numero}</td>
                <td>{data}</td>
                </tr>
            </React.Fragment>;}
        return null    
      });

  function isWeekDay(date){
    date = date.split('-');
    var yy = parseInt(date[0]);
    var mm = parseInt(date[1]);
    var dd = parseInt(date[2]);
    let ddWeek = Math.trunc(dd+(2*mm)+((3*(mm+1))/5)+yy+Math.trunc(yy/4)-Math.trunc(yy/100));
    ddWeek = ddWeek % 7;
    return ddWeek;
  }

  return (
    <div>
      <header>
      <span>
            <Moment>{dateToFormat}</Moment></span>
      </header>
      
      <div className="items-grid">
      <Container fluid="sm">
      <Pagination size="lg">
        <Pagination.First data-id="1" />
        <Pagination.Prev  data-id="2" onClick={e=>dispatch({ type: 'preview' })}/>
        <Pagination.Item data-id="3" >{previewPages}</Pagination.Item>
        <Pagination.Item data-id="4" active >{pages}</Pagination.Item>
        <Pagination.Item data-id="5" >{nextPages}</Pagination.Item>
        <Pagination.Next data-id="6" onClick={e=>dispatch({ type: 'next' })}/>
        <Pagination.Last data-id="7" />
      </Pagination>
      </Container>
      </div>
      
      <div><Container fluid="sm">
      <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th className="text-center"><Button
        onClick={() => dispatch({ type: 'open' })}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
      Segunda-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => dispatch({ type: 'open2' })}
        aria-controls="example-collapse-text"
        aria-expanded={open2}
      >
      Terça-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => dispatch({ type: 'open3' })}
        aria-controls="example-collapse-text"
        aria-expanded={open3}
      >
      Quarta-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => dispatch({ type: 'open4' })}
        aria-controls="example-collapse-text"
        aria-expanded={open4}
      >
      Quinta-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => dispatch({ type: 'open5' })}
        aria-controls="example-collapse-text"
        aria-expanded={open5}
      >
      Sexta-feira
      </Button></th><th className="text-center"><Button
        onClick={() => dispatch({ type: 'open6' })}
        aria-controls="example-collapse-text"
        aria-expanded={open5}
      >
      Sábado
      </Button></th><th className="text-center"><Button
        onClick={() => dispatch({ type: 'open7' })}
        aria-controls="example-collapse-text"
        aria-expanded={open5}
      >
      Domingo
      </Button></th></tr>
              </thead>
              <tbody></tbody>
      </Table>
      </Container>
      </div>
      
      <Collapse in={open}>
      <div id="example-collapse-text">
          <Table responsive="sm" size="sm" hover striped bordered>
             <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Segunda feira</th></tr>
              </thead>
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersMonday}
                </tbody>      
          </Table>    
      </div>
      </Collapse>
      <Collapse in={open2}>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Terça feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersTuesday}
                </tbody>      
          </Table>   
      </div>
      </Collapse>
      <Collapse in={open3}>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Quarta feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersWenesday}
                </tbody>      
          </Table>   
      </div>
      </Collapse>
      <Collapse in={open4}>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Quinta feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersThursday}
                </tbody>      
          </Table>   
      </div>
      </Collapse>
      <Collapse in={open5}>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Sexta feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersFriday}
                </tbody>      
          </Table>   
      </div>
      </Collapse>
      <Collapse in={open6}>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Sábado</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersSaturday}
                </tbody>      
          </Table>   
      </div>
      </Collapse>
      <Collapse in={open7}>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Domingo</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersSunday}
                </tbody>      
          </Table>   
      </div>
      </Collapse>
    </div>
    );
    
};

export default Program;
