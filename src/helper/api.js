import { getToken } from './token';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL;


const api = axios.create({
    baseURL: API_BASE,
});

api.interceptors.request.use( async config =>{
    const token = getToken();
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api