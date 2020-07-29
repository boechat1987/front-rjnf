// import React, {useState, useEffect} from 'react';
// import {Link, useHistory} from 'react-router-dom';
// import { FiLogIn } from 'react-icons/fi';
// // import logo from '../../assets/logo.png';
// import { doGet } from "../../helper/ApiHelper";
// import './styles.css';
import React, { useReducer } from 'react';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL;

async function login(user){
  let retornoAxios;
  let params = {
    users: user,   
  }
        await axios.post(`${API_BASE}users/authenticate`, params, {
          })      
          .then((response) => {
            retornoAxios = true
            console.log('response',response.data)
            return true
          })
          .catch((error) => {
            retornoAxios = false
            console.log('error',error.response)
           return false
            //dispatch(userUpdateProfileFail())
          })
  return retornoAxios
};

function loginReducer(state, action) {
    switch (action.type) {
      case 'field': {
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      }
      case 'login': {
        return {
          ...state,
          error: '',
          isLoading: true,
        };
      }
      case 'success': {
        return {
          ...state,
          isLoggedIn: true,
          isLoading: false,
        };
      }
      case 'error': {
        return {
          ...state,
          error: 'Nome de usuário ou senha incorreto!',
          isLoggedIn: false,
          isLoading: false,
          username: '',
          password: '',
        };
      }
      case 'logOut': {
        return {
          ...state,
          isLoggedIn: false,
        };
      }
      default:
        return state;
    }
  }
  
  const initialState = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    token:'',
    isLoggedIn: false,
  };
  
  export default function LoginUseReducer() {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const { username, password, isLoading, error, isLoggedIn } = state;

    const onSubmit = async (e) => {
      e.preventDefault();
  
      dispatch({ type: 'login' });
  
      try {
       const testaValidadeUsuario = await login({username,password});
        
          if (testaValidadeUsuario === true){
            dispatch({ type: 'success' });
            }
          else{
            dispatch({ type: 'error' });    
          } 
      } catch (error) {
        console.log('error',error)
      }
    };
  
    return (
      <div className='App'>
        <div className='login-container'>
          {isLoggedIn ? (
            <>
              <h1>Bem Vindo {username}!</h1>
              <button onClick={() => dispatch({ type: 'logOut' })}>
                Sair
              </button>
            </>
          ) : (
            <form className='form' onSubmit={onSubmit}>
              {error && <p className='error'>{error}</p>}
              <p>ACESSO</p>
              <input
                type='text'
                placeholder='Usuário'
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: 'field',
                    fieldName: 'username',
                    payload: e.currentTarget.value,
                  })
                }
              />
              <input
                type='password'
                placeholder='Senha'
                autoComplete='new-password'
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: 'field',
                    fieldName: 'password',
                    payload: e.currentTarget.value,
                  })
                }
              />
              <button className='submit' type='submit' disabled={isLoading}>
                {isLoading ? 'Verificando, aguarde...' : 'Entrar'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }


// export default function Logon(){
//     let id = 0;
//     const history = useHistory();
//     const [users, setUsers] = useState([]);
//     const [username, setUsername] = useState('');
    
//     useEffect(() => {
//         doGet("users").then((response) => setUsers(response));
//     }, []);
    
//         async function handleLogin(e){
//             e.preventDefault();
            
//             try{
//                 users.forEach (p=> {
//                     if (username === p.username){
//                         id = (p.id);
//                         return history.push(`/Program/${id}`);
//                     }
//                   });
//                 /*const response = await api.post('sessions', {id});
                
//                 localStorage.setItem('progId', id);
//                 localStorage.setItem('progName', response.data.name);
//             */
                
                
//             } catch(err){
//                 alert('Falha no login, tente novamente.')
//             }  
//         }

//         return(
//             <div className="logon-container">
//                 <section className="form">
//                     {/* <img src={logo} alt="verificarImg 1" /> */}
//                     <form onSubmit={handleLogin}>
//                         <h1> Faça seu login</h1>

//                         <input 
//                             placeholder="Sua ID"
//                             value={username}
//                          onChange={e=> setUsername(e.target.value)} 
//                         />
//                         <button className= "button" type="submit">Entrar</button>

//                         <Link className="back-link" to="/Register"> 
//                         <FiLogIn size={16} color="#E02041" />
//                             não tenho cadastro
//                         </Link>
//                     </form>
//                 </section>
//             {/* <img src={logo} alt="verificaImg2" /> */}
//             </div>
//         );
// }