import React, { useEffect, useState } from "react";
import { doGet } from "../../helper/ApiHelper";
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
//import PageItem from 'react-bootstrap/PageItem';
import './styles.css';
//import { Preview } from "react-dropzone-uploader";

const Program = () => {

  
  const [person, setPerson] = useState([]);
  const [userOrdens, setUserOrdens] = useState([]);
  const [userProgs, setUserProgs] = useState([]);
  const [pages, setPages] = useState([]);
  const [previewPages, setPreviewPages] = useState([]);
  const [nextPages, setNextPages] = useState([]);
  let ListOrdensId = [];

  useEffect(() => {
    doGet("prog/ordem/").then((ordensUsuarios) => setUserOrdens(ordensUsuarios));
    doGet("prog/semana/").then((progsUsuarios) => setUserProgs(progsUsuarios));
    doGet("users").then((response) => setPerson(response));
    setPreviewPages(1);
    setPages(2);
    setNextPages(3);
  }, []);

  if(!userOrdens || !userOrdens.length){
    return <h1>Loading...</h1>;
  }
 function handlePagesNext(){
   if (pages>=2 && pages<=50){
    setPages(pages+1);
    setNextPages(nextPages+1);
    setPreviewPages(previewPages+1);}
  }
  function handlePagesPreview(){
    if (pages>2 && pages<=50){
    setPages(pages-1);
    setNextPages(nextPages-1);
    setPreviewPages(previewPages-1);}
  }

  function PrimeiraPage(){
    const {months} = dateDiff("2020-01-01");
    if (months>1){
    const firstPage = Math.trunc((months*30)/7)
    setPages(firstPage)}
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
    //
    return {years: years, months: months, days: days};
}
  // function calcDateSemanaAtual(date1,date2) {
  //   const diff = Math.floor(date1.getTime() - date2.getTime());
  //   const day = 1000 * 60 * 60 * 24;
  //   const days = Math.floor(diff/day);
  //   const months = Math.floor(days/31);
  //   const years = Math.floor(months/12);

  //   const message = date2.toDateString();
  //   return Math.trunc(days/7);
  //   }

  // const semanaId = [...Array(52).keys()].map(i => ({ id: (i), semana: false }));

  // const usersOrdem = userOrdens.map((ordens) => {
  //   const id = ordens.id;
  //   return <li key={id}>
  //     <strong>Descrição:</strong> {ordens.text} <br></br>
  //     <strong>Executante:</strong>{ordens.user_id} <br></br>
  //     <strong>Id programação:</strong>{ordens.programacao_id}
  //   </li>;
  // });
      person.forEach (person=>{
        userOrdens.forEach (ListOrdensPeloId => { 
            const user = person.id;
              userProgs.forEach((program) => {
                const progId = program.id;
                if (ListOrdensPeloId.programacao_id === (parseInt(progId))){  
                  if (ListOrdensPeloId.user_id===(parseInt(user))){
                    ListOrdensId.push(
                      {
                        nome: person.username,
                        data: program.data,
                        text: ListOrdensPeloId.text,
                        numero: ListOrdensPeloId.numero,
                        osId: ListOrdensPeloId.id
                      }                   
                    )
                  }   
                }
              });
        });
      });
  const usersOrdem = ListOrdensId.map((ordens) => {
    const id = ordens.osId;
    const data = ordens.data.split("T",1);

      return <React.Fragment key={id}>
            <tr><td>{ordens.nome}</td>
            <td>{ordens.text}</td>
            <td>{ordens.numero}</td>
            <td>{data}</td>
            </tr>
        </React.Fragment>;
  });

  // const collectedItems = document.querySelector("input[name=items]")
  // let selectedItems = []

  // const itemsToCollect = document.querySelectorAll(".items-grid li a");
  // for (const item of itemsToCollect){
  //   item.addEventListener("click", handleSelectedItem);
  // }

  // function handleSelectedItem(event){
  //   const itemLi = event.target;
  //   itemLi.classList.add("selected");
  //   const itemId = itemLi.dataset.id;
    
    // const alreadySelected = selectedItems.findIndex(item=>{
    //    const itemFound = item === itemId
    //    return itemFound
    // })

    // if (alreadySelected >= 0){
    //     const filteredItems = selectedItems.filter(item=>{
    //     const itemIsDifferent = item !== itemId // false;
    //     return itemIsDifferent;
    //   })
    
    // selectedItems = filteredItems
    // } else{
    //   //se não estiver selecionado, adiciona seleção
    //   selectedItems.push(itemId)
    //   setPages(pages+1)
    // }
    // console.log(itemId)
  //   collectedItems.value = selectedItems
  //   if (itemId === "6"){
  //     setPreviewPages (previewPages+1);
  //     setPages (pages+1);
  //     setNextPages (nextPages+1)
  //   }
  //   console.log(itemLi)
  // }
  
  return (
    <div>
      <header>
      <span>Programação: {pages}</span>
      </header>
      <div>
      <input type="button" className="button" value=" Prog mais atual" onClick={e=>PrimeiraPage()}></input>
      </div>
      <div className="items-grid">
      <Pagination >
        <Pagination.First data-id="1" />
        <Pagination.Prev  data-id="2" onClick={e=>handlePagesPreview()}/>
        <Pagination.Item data-id="3" >{previewPages}</Pagination.Item>
        <Pagination.Item data-id="4" active >{pages}</Pagination.Item>
        <Pagination.Item data-id="5" >{nextPages}</Pagination.Item>
        <Pagination.Next data-id="6" onClick={e=>handlePagesNext()}/>
        <Pagination.Last data-id="7" />
      </Pagination>
      </div>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Segunda feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                {usersOrdem}
                {/* {usersProgram} */}
                </tbody>      
          </Table>
            
      </div>
      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Terça feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                
                </tbody>      
          </Table>   
      </div>

      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Quarta feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                
                </tbody>      
          </Table>   
      </div>

      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Quinta feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                
                </tbody>      
          </Table>   
      </div>

      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Sexta feira</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                
                </tbody>      
          </Table>   
      </div>

      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Sábado</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                
                </tbody>      
          </Table>   
      </div>

      <div className="">
          <Table responsive="sm" size="sm" hover striped bordered>
              <thead>
                <tr><th>Semana: {pages}</th><th className="text-center" colSpan="3">Domingo</th></tr>
              </thead> 
              <thead>
                <tr><th>Executante</th><th>Descrição</th><th>OS</th><th>Data</th></tr>
              </thead> 
                <tbody>
                
                </tbody>      
          </Table>   
      </div>
      
    </div>
    );
    
};

export default Program;
