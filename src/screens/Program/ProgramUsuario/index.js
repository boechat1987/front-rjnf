import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doGet } from "../../../helper/ApiHelper";
import './styles.css';

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
    return <li key={osId}>
    <strong>Numero OS:</strong> {showprog.numero} <br></br>
    <strong>Descrição da ordem:</strong> {showprog.text} <br></br>
    <strong>Programação_id:</strong> {showprog.prog_id} 
    </li>;
  });

  return (
    
    <div className="profile-container">
      <header>
        <span><strong>Executante: {person.username}</strong></span>
      </header>
      <ul>
          {showUserProgram}
      </ul>
    </div>
    );
};

export default ProgramUsuario;
