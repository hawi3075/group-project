// src/api/axios.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ecommerce-backend-1-87dk.onrender.com/api',
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If this return is missing, the frontend stays "loading" forever
    return Promise.reject(error); 
  }
);

export default API;