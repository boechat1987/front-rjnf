import React, { useEffect, useState, useReducer } from "react";
import { doGet } from "../../helper/ApiHelper";
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
//import PageItem from 'react-bootstrap/PageItem';
import './styles.css';
const API_BASE = process.env.REACT_APP_API_URL;
//import { Preview } from "react-dropzone-uploader";

const Program = () => {

  const initialState = {page: 2};
  const [person, setPerson] = useState([]);
  const [userOrdens, setUserOrdens] = useState([]);
  const [progSemana, setProgSemanas] = useState([]);
  const [userProgs, setUserProgs] = useState([]);
  const [pages, setPages] = useState([]);
  const [previewPages, setPreviewPages] = useState([]);
  const [nextPages, setNextPages] = useState([]);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [state, dispatch] = useReducer(pagesReducer, initialState);
  let ListOrdensId = [];
  
  useEffect(() => {
    
    doGet("prog/ordem/")
    .then((ordensUsuarios) => setUserOrdens(ordensUsuarios));

    doGet("prog/semana/")
    .then((progsUsuarios) => setUserProgs(progsUsuarios));
    doGet("users").then((response) => setPerson(response));
    
    dispatch({ type: 'paginaInicial' });
  }, []);

  useEffect(() => {
      axios.get(`${API_BASE}prog/semana/busca/${pages}`)
          .then((response) => {
          setProgSemanas(response.data);
          }).catch((error) => {
          console.log("error");
          })             
          }, [pages]);
  // console.log(progSemana)
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
      person.forEach (person=>{
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
      });
    }catch (error) {
      return console.log("não tem prog")
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
      <span></span>
      {/* <button onClick={() => dispatch({type: 'decrement'})}>-</button> */}
      </header>
      {/* <div>
      <Container fluid="sm">
      <input type="button" className="button" value="Atualizar" onClick={e=>PrimeiraPage()}></input>
      </Container>
      </div> */}
      
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
      
      <div>
      <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th className="text-center"><Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
      Segunda-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => setOpen2(!open2)}
        aria-controls="example-collapse-text"
        aria-expanded={open2}
      >
      Terça-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => setOpen3(!open3)}
        aria-controls="example-collapse-text"
        aria-expanded={open3}
      >
      Quarta-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => setOpen4(!open4)}
        aria-controls="example-collapse-text"
        aria-expanded={open4}
      >
      Quinta-feira
      </Button></th>
      <th className="text-center"><Button
        onClick={() => setOpen5(!open5)}
        aria-controls="example-collapse-text"
        aria-expanded={open5}
      >
      Sexta-feira
      </Button></th><th className="text-center"><Button
        onClick={() => setOpen6(!open6)}
        aria-controls="example-collapse-text"
        aria-expanded={open5}
      >
      Sábado
      </Button></th><th className="text-center"><Button
        onClick={() => setOpen7(!open7)}
        aria-controls="example-collapse-text"
        aria-expanded={open5}
      >
      Domingo
      </Button></th></tr>
              </thead>
              <tbody></tbody>
      </Table>
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
