'use client';

import axios from "axios";

// Crear instancia base sin el token
export const axioInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token dinámicamente
axioInstance.interceptors.request.use((config) => {
  // Solo ejecutar en el cliente
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});