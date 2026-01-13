import { apiClient, PROJECT_ID } from '../../../api/client';
import type { RequestCodeRequest, AuthResponse } from '../types';
import { setToken, clearToken, getToken } from '../../../utils/storage';
import axios from 'axios';

// Interfaces para las respuestas de ReqRes
interface MagicLinkLoginResponse {
  data: {
    token: string;
  };
}

interface VerifyCodeResponse {
  data: {
    session_token: string;
    app_user: {
      id: string;
      email: string;
    };
  };
}

// Clave para almacenar usuarios registrados en localStorage
const REGISTERED_USERS_KEY = 'registered_users';

// Funciones auxiliares para manejar usuarios registrados localmente
const getRegisteredUsers = (): string[] => {
  const users = localStorage.getItem(REGISTERED_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const addRegisteredUser = (email: string): void => {
  const users = getRegisteredUsers();
  const normalizedEmail = email.toLowerCase();
  if (!users.includes(normalizedEmail)) {
    users.push(normalizedEmail);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  }
};

const isUserRegistered = (email: string): boolean => {
  const users = getRegisteredUsers();
  return users.includes(email.toLowerCase());
};

export const authService = {
  // Paso 1: Solicitar código de verificación SOLO para usuarios existentes (LOGIN)
  async requestCode(data: RequestCodeRequest): Promise<void> {
    try {
      console.log('[AuthService] Solicitando código para:', data.email);
      
      // Verificamos si el usuario está registrado localmente
      if (!isUserRegistered(data.email)) {
        throw new Error('El correo electrónico no está registrado. Por favor, crea una cuenta primero.');
      }
      
      const response = await apiClient.post<MagicLinkLoginResponse>('/app-users/login', {
        email: data.email,
        project_id: PROJECT_ID,
      });
      console.log('[AuthService] Código enviado al email:', response.data);
    } catch (error: unknown) {
      console.error('[AuthService] Error al solicitar código:', error);
      
      // Manejar error 429 (rate limit)
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        throw new Error('⏳ Demasiados intentos. Espera 1 minuto antes de volver a intentar.');
      }
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al procesar la solicitud.');
    }
  },

  // Paso 2: Verificar el código de 6 dígitos y obtener session_token
  async verifyCode(email: string, code: string): Promise<AuthResponse> {
    try {
      console.log('[AuthService] Verificando código:', code, 'para:', email);
      
      const response = await axios.post<VerifyCodeResponse>(
        'https://reqres.in/api/app-users/verify',
        { token: code },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      console.log('[AuthService] Respuesta de verify:', response.data);
      
      const sessionToken = response.data.data.session_token;
      
      console.log('[AuthService] Código verificado, guardando session_token');
      setToken(sessionToken);
      
      // Aseguramos que el usuario quede registrado después de verificar
      addRegisteredUser(email);
      
      return { token: sessionToken };
    } catch (error) {
      console.error('[AuthService] Error al verificar código:', error);
      if (error instanceof Error) {
        throw new Error('Código inválido o expirado.');
      }
      throw new Error('Error al verificar código.');
    }
  },

  // Registro: permite crear nuevos usuarios
  async register(data: RequestCodeRequest): Promise<void> {
    try {
      console.log('[AuthService] Registrando usuario:', data.email);
      
      // Verificamos si ya está registrado
      if (isUserRegistered(data.email)) {
        throw new Error('Este correo ya está registrado. Por favor, inicia sesión.');
      }
      
      await apiClient.post<MagicLinkLoginResponse>('/app-users/login', {
        email: data.email,
        project_id: PROJECT_ID,
      });
      
      // Guardamos el email como registrado ANTES de verificar
      // (se confirmará cuando verifique el código)
      addRegisteredUser(data.email);
      
      console.log('[AuthService] Código enviado para registro');
    } catch (error) {
      console.error('[AuthService] Error en registro:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al procesar el registro.');
    }
  },

  // Cerrar sesión
  logout(): void {
    console.log('[AuthService] Cerrando sesión, eliminando token');
    clearToken();
  },

  // Verificar si hay sesión activa
  isAuthenticated(): boolean {
    return !!getToken();
  },
  
  // Inicializar usuario existente (para usuarios que ya existen en ReqRes)
  initExistingUser(email: string): void {
    addRegisteredUser(email);
  },
};
