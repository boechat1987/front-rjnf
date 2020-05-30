import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doGet } from "../../../helper/ApiHelper";

const ProgramUsuario = () => {
  const [person, setPerson] = useState(null);
  const [userOrdens, setUserOrdens] = useState([]);
  const { id } = useParams();
  let ListOrdensId = [];

  useEffect(() => {
    doGet(`users/${id}`).then((response) => setPerson(response));
    doGet("prog/ordem/").then((ordensUsuarios) => setUserOrdens(ordensUsuarios));
  }, [id]);

  if(!person){
    return <h1>Loading...</h1>
  }

  userOrdens.forEach (ListOrdensPeloId => {
    if (ListOrdensPeloId.user_id===(parseInt(id))){
        ListOrdensId.push(
                {
                    text: ListOrdensPeloId.text,
                    prog_id: ListOrdensPeloId.programacao_id,
                    numero: ListOrdensPeloId.numero,
                    osId: ListOrdensPeloId.id
                }
            
        )}
  });

  const showUserProgram = ListOrdensId.map((showprog) => {
    const osId = showprog.osId;
    return <li key={osId}>Descrição da ordem: {showprog.text} <br></br>
    Programação_id: {showprog.prog_id} <br></br>
    Numero OS: {showprog.numero}</li>;
  });

  return (
    <>
    <h1>{person.username}</h1>
    <ul>
        {showUserProgram}
    </ul>
    </>
    );
};

export default ProgramUsuario;
