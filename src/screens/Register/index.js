import React, {useState} from  'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from "react-icons/fi";
import axios from 'axios';
import './styles.css'
const API_BASE = process.env.REACT_APP_API_URL;

//import api from '../../services/api';
//import { doGet } from "../../helper/ApiHelper";
//import logoImg from '../../assets/logo.png';

export default function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();
    
    async function handleRegister(e){
        e.preventDefault();
        const data = {
        username,
        email,
        password,
        };

      try{
            await axios({
            url: `${API_BASE}users`,
            method: 'POST',
            data: data,
            }).then((response) => {
                alert(`Seu ID de acesso: ${response.data.username}`);
                history.push('/Signin');
            }).catch((error) => {
                alert(`Erro no cadastro, tente novamente: ${error}`);
            });
        } catch (err){
            console.log(err);
         }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section className="form">
                <form onSubmit={handleRegister}>
                    <h1>Faça seu cadastro</h1>
                    <input 
                        placeholder="Usuario"
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar </button>
                    <Link className="back-link" to="/Signin"> 
                        <FiArrowLeft size={16} color="#E02041" />
                        Sign in
                    </Link>
                </form>
                </section>
            </div>
            
        </div>
    );
}