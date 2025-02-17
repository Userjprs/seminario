import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// usuarios
export const getUsuarios = () => axios.get(`${API_URL}/usuarios/`);
export const createUsuario = (data) => axios.post(`${API_URL}/usuarios/`, data);

// libros
export const getLibros = () => axios.get(`${API_URL}/libros/`);
export const createLibro = (data) => axios.post(`${API_URL}/libros/`, data);

// prestamos
export const getPrestamos = () => axios.get(`${API_URL}/prestamos/`);
export const createPrestamo = (data) => axios.post(`${API_URL}/prestamos/`, data);

// Resenas
export const getResenas = () => axios.get(`${API_URL}/resenas/`);
export const createResena = (data) => axios.post(`${API_URL}/resenas/`, data);