// HTTP Client configuration - Axios + ReqRes Magic Link
import axios from 'axios';

// Configuración de ReqRes - Variables de entorno
export const PROJECT_ID = import.meta.env.VITE_REQRES_PROJECT_ID || '1585';
export const API_KEY = import.meta.env.VITE_REQRES_API_KEY || 'pub_67b1ab9521448700465fdc0af676157c3c8582d2fe3fb424af61cd69c42a5392';

// Instancia de Axios configurada para ReqRes App Users (Magic Link)
const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'x-reqres-env': 'prod',
  },
});

// Interceptor para logging
apiClient.interceptors.request.use((config) => {
  console.log(`[Axios] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('[Axios] Response:', response.data);
    return response;
  },
  (error) => {
    console.error('[Axios] Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { apiClient };
