import React, { useEffect, useState } from "react";
import { doGet } from "../../helper/ApiHelper";
import './styles.css';

const Program = () => {
  const [userOrdens, setUserOrdens] = useState([]);
  const [userProgs, setUserProgs] = useState([]);

  useEffect(() => {
    doGet("prog/ordem/").then((ordensUsuarios) => setUserOrdens(ordensUsuarios));
    doGet("prog/semana/").then((progsUsuarios) => setUserProgs(progsUsuarios));
  }, []);

  if(!userOrdens){
    return <h1>Loading...</h1>
  }
  
  const usersOrdem = userOrdens.map((ordens) => {
    const id = ordens.id;
    return <li key={id}>
      <strong>Descrição:</strong> {ordens.text} <br></br>
      <strong>Executante:</strong>{ordens.user_id} <br></br>
      <strong>Id programação:</strong>{ordens.programacao_id}
    </li>;
  });

  const usersProgram = userProgs.map((program) => {
    const id = program.id;
  return <li key={id}>data: {program.data} <br></br>
  Programação_id: {program.id}</li>;
  });

  return (
    
    <div className="profile-container">
      <header>
      <span>Programação: ??</span>
      </header>
      {/* <span>Bem vinda, {prog.semana}</span> */}
      <ul>
          {usersOrdem}
      </ul>
      <ul>
          {usersProgram}
      </ul>
    </div>
    );
};

export default Program;
