// Auth types - ReqRes Magic Link Flow

// Paso 1: Solicitar código (envía email)
export interface RequestCodeRequest {
  email: string;
}

export interface RequestCodeResponse {
  message: string;
}

// Paso 2: Verificar código (login/register)
export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  token: string;
  id?: number;
}

// Para compatibilidad con formularios existentes
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  email: string;
  password?: string;
}

export interface User {
  email: string;
}
