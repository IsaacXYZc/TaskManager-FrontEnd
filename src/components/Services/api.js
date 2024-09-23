import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const setAuth = (token) => {
  if (typeof token === 'string') {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.error('El token proporcionado si es una cadena válida:')
  } else {
    console.error('El token proporcionado no es una cadena válida:', token);
  }
};
export const clearAuth = () =>{
  localStorage.removeItem('token')
  delete api.defaults.headers['Authorization'];
}

api.interceptors.request.use((config) => {
  console.log('Headers de Solicitud:', config.headers);
  return config;
}, (error) => {
  return Promise.reject(error);
});


