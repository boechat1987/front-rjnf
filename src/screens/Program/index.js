import React, { useEffect, useState } from "react";
import { doGet } from "../../helper/ApiHelper";

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
    return <li key={id}>{ordens.text} <br></br>
    user id:{ordens.user_id} <br></br>
    programação id:{ordens.programacao_id}
    </li>;
  });

  const usersProgram = userProgs.map((program) => {
    const id = program.id;
  return <li key={id}>data: {program.data} <br></br>
  Programação_id: {program.id}</li>;
  });

  return (
    
    <>
    <h1>Semana ??</h1>
    <ul>
        {usersOrdem}
    </ul>
    <ul>
        {usersProgram}
    </ul>
    </>
    );
};

export default Program;
