import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import { doGet } from "../../helper/ApiHelper";
import './styles.css';

export default function Logon(){
    let id = 0;
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        doGet("users").then((response) => setUsers(response));
    }, []);
    
        async function handleLogin(e){
            e.preventDefault();
            
            try{
                users.forEach (p=> {
                    if (username === p.username){
                        id = (p.id);
                        return history.push(`/Program/Usuario/${id}`);
                    }
                  });
                /*const response = await api.post('sessions', {id});
                
                localStorage.setItem('progId', id);
                localStorage.setItem('progName', response.data.name);
            */
                
                
            } catch(err){
                alert('Falha no login, tente novamente.')
            }  
        }

        return(
            <div className="logon-container">
                <section className="form">
                    <img src={logo} alt="verificarImg 1" />

                    <form onSubmit={handleLogin}>
                        <h1> Faça seu logon</h1>

                        <input 
                            placeholder="Sua ID"
                            value={username}
                         onChange={e=> setUsername(e.target.value)} 
                        />
                        <button className= "button" type="submit">Entrar</button>

                        <Link className="back-link" to="/"> 
                        <FiLogIn size={16} color="#E02041" />
                            não tenho cadastro
                        </Link>
                    </form>
                </section>
            <img src={logo} alt="verificaImg2" />
            </div>
        );
}