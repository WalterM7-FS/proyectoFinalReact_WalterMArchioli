import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://proyectofinabackend-waltermarchioli.onrender.com/api"
});

// Interceptor para agregar el token de autorización
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregar el token en los encabezados
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);