'use client';

import axios from "axios";
import Swal from 'sweetalert2'; // Asegúrate de tener sweetalert2 instalado
import { useRouter } from 'next/navigation';
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

// Interceptor de respuesta para manejar errores como 403
axioInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      if (typeof window !== 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes permisos para realizar esta acción.',
          
        }).then(() => {
          const router = useRouter();
          router.push('/dashboard');
        });
      }
    }
    return Promise.reject(error);
  }
);
