<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,20&height=180&section=header&text=Viajes%20Oeste&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Sistema%20de%20Autenticación%20Moderno&descSize=18&descAlignY=55">
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,20&height=180&section=header&text=Viajes%20Oeste&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Sistema%20de%20Autenticación%20Moderno&descSize=18&descAlignY=55">
  <img alt="Header" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,20&height=180&section=header&text=Viajes%20Oeste&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Sistema%20de%20Autenticación%20Moderno&descSize=18&descAlignY=55" width="100%">
</picture>

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)

**Aplicación web moderna de autenticación para agencia de viajes con verificación por código de 6 dígitos**

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [Documentación](#-documentación)

</div>

---

## 📑 Tabla de Contenidos

- [🎯 Descripción General](#-descripción-general)
- [✨ Características](#-características)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🏗️ Arquitectura](#️-arquitectura)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚡ Instalación](#-instalación)
- [⚙️ Configuración](#️-configuración)
- [🎮 Demo](#-demo)
- [📖 Documentación](#-documentación)
- [🔐 Flujo de Autenticación](#-flujo-de-autenticación)
- [🎨 Capturas de Pantalla](#-capturas-de-pantalla)
- [🗺️ Roadmap](#️-roadmap)
- [👨‍💻 Autor](#-autor)
- [📄 Licencia](#-licencia)

---

## 🎯 Descripción General

**Viajes Oeste** es una aplicación web moderna que implementa un sistema de autenticación completo utilizando **Magic Link** con verificación por código de 6 dígitos. Diseñada con las mejores prácticas de desarrollo frontend, ofrece una experiencia de usuario fluida y segura.

### 🎯 Objetivo del Proyecto

Demostrar la implementación de un flujo de autenticación moderno y seguro, aplicando arquitectura escalable y patrones de diseño profesionales en React.

---

## ✨ Características

<div align="center">

```mermaid
mindmap
  root((Viajes Oeste))
    Autenticación
      Login con Email
      Código 6 dígitos
      Verificación Magic Link
      Registro de usuarios
      Logout seguro
    UI/UX Moderno
      Diseño Split Screen
      Animaciones CSS
      Responsive Design
      Dark Theme Ready
      Iconografía React Icons
    Seguridad
      Tokens JWT
      Rate Limiting
      Validación de usuarios
      Rutas protegidas
    Arquitectura
      Feature-based
      TypeScript strict
      Custom Hooks
      Services Layer
```

</div>

### 🔑 Funcionalidades Principales

| Característica | Descripción |
|----------------|-------------|
| 🔐 **Autenticación Segura** | Sistema de login con verificación por código de 6 dígitos enviado al email |
| 📝 **Registro de Usuarios** | Creación de cuentas nuevas con validación de email único |
| 🛡️ **Rutas Protegidas** | Acceso restringido al dashboard solo para usuarios autenticados |
| 🎨 **UI Profesional** | Diseño moderno con split-screen, gradientes y animaciones |
| 📱 **Responsive** | Adaptable a todos los tamaños de pantalla |
| ⚡ **Rate Limiting** | Manejo inteligente de límites de la API |

---

## 🛠️ Stack Tecnológico

<div align="center">

### Frontend Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | 18.3.1 | Biblioteca UI |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | 5.6.2 | Tipado estático |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | 6.0.5 | Build tool |

### Dependencias Principales

| Paquete | Propósito |
|---------|-----------|
| `react-router-dom` | Enrutamiento SPA |
| `axios` | Cliente HTTP |
| `react-icons` | Iconografía |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| ESLint | Linting de código |
| TypeScript ESLint | Reglas TS |
| Vite Plugin React | HMR y Fast Refresh |

</div>

---

## 🏗️ Arquitectura

<div align="center">

```mermaid
flowchart TB
    subgraph Cliente["🖥️ Cliente - React + Vite"]
        subgraph Pages["📄 Pages"]
            LP[LoginPage]
            RP[RegisterPage]
            VP[VerifyCodePage]
            DP[DashboardPage]
        end
        
        subgraph Services["⚙️ Services"]
            AS[authService]
        end
        
        subgraph Components["🧩 Components"]
            UI[UI Components]
            PR[ProtectedRoute]
        end
        
        subgraph Utils["🔧 Utils"]
            ST[Storage]
            VL[Validation]
        end
    end
    
    subgraph API["🌐 ReqRes API"]
        LOGIN["/app-users/login"]
        VERIFY["/app-users/verify"]
    end
    
    LP --> AS
    RP --> AS
    VP --> AS
    AS --> LOGIN
    AS --> VERIFY
    AS --> ST
    PR --> ST
    
    style Cliente fill:#1e3a8a,color:#fff
    style API fill:#059669,color:#fff
```

</div>

### 📐 Patrón de Arquitectura

El proyecto sigue una **arquitectura basada en features** (Feature-based Architecture):

```
src/
├── features/          # Módulos por funcionalidad
│   └── auth/          # Feature de autenticación
├── components/        # Componentes compartidos
├── api/              # Configuración HTTP
├── utils/            # Utilidades globales
└── app/              # Configuración de la app
```

---

## 📁 Estructura del Proyecto

```
agencia-viajes-oeste-frontend-react-vite-auth/
│
├── 📂 src/
│   ├── 📂 api/
│   │   └── 📄 client.ts              # Cliente Axios configurado
│   │
│   ├── 📂 app/
│   │   ├── 📄 AppRoutes.tsx          # Definición de rutas
│   │   └── 📄 ProtectedRoute.tsx     # HOC para rutas protegidas
│   │
│   ├── 📂 components/
│   │   └── 📂 ui/
│   │       ├── 📄 Alert.tsx          # Componente de alertas
│   │       ├── 📄 Button.tsx         # Botón reutilizable
│   │       ├── 📄 TextInput.tsx      # Input de texto
│   │       └── 📄 index.ts           # Barrel exports
│   │
│   ├── 📂 features/
│   │   └── 📂 auth/
│   │       ├── 📂 pages/
│   │       │   ├── 📄 LoginPage.tsx      # Página de login
│   │       │   ├── 📄 RegisterPage.tsx   # Página de registro
│   │       │   ├── 📄 VerifyCodePage.tsx # Verificación de código
│   │       │   ├── 📄 DashboardPage.tsx  # Panel principal
│   │       │   └── 📄 *.css              # Estilos por página
│   │       │
│   │       ├── 📂 services/
│   │       │   └── 📄 authService.ts # Lógica de autenticación
│   │       │
│   │       └── 📂 types/
│   │           └── 📄 index.ts       # Tipos TypeScript
│   │
│   ├── 📂 styles/
│   │   ├── 📄 tokens.css             # Variables CSS (Design Tokens)
│   │   └── 📄 global.css             # Estilos globales
│   │
│   ├── 📂 utils/
│   │   ├── 📄 storage.ts             # Manejo de localStorage
│   │   └── 📄 validation.ts          # Validaciones
│   │
│   ├── 📄 App.tsx                    # Componente raíz
│   └── 📄 main.tsx                   # Entry point
│
├── 📄 index.html
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📄 README.md
```

---

## ⚡ Instalación

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git**

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/RodrigoSanchezDev/agencia-viajes-oeste.git

# 2. Navegar al directorio
cd agencia-viajes-oeste-frontend-react-vite-auth

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:5173` |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint |

---

## ⚙️ Configuración

### Variables de Entorno

El proyecto utiliza la API de ReqRes. La configuración se encuentra en `src/api/client.ts`:

```typescript
// Configuración de ReqRes
export const PROJECT_ID = 'tu_project_id';
export const API_KEY = 'tu_api_key';
```

### Obtener Credenciales de ReqRes

1. Visita [https://reqres.in](https://reqres.in)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia el `Project ID` y `API Key`
5. Actualiza `src/api/client.ts`

---

## 🎮 Demo

### Cómo Probar

1. Regístrate con tu email personal
2. Inicia sesión con el email registrado
3. Revisa tu bandeja de entrada para obtener el código
4. Ingresa el código de 6 dígitos
5. Accede al Dashboard

> **Nota:** El sistema utiliza ReqRes API para el envío de códigos de verificación.

---

## 📖 Documentación

### 🔐 Flujo de Autenticación

<div align="center">

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant A as ReqRes API
    participant E as Email
    
    U->>F: Ingresa email
    F->>F: Valida usuario local
    F->>A: POST /app-users/login
    A->>E: Envía código 6 dígitos
    E->>U: Recibe código
    U->>F: Ingresa código
    F->>A: POST /app-users/verify
    A->>F: Retorna session_token
    F->>F: Guarda token en localStorage
    F->>U: Redirige a Dashboard
```

</div>

### 🔒 Manejo de Sesión

```typescript
// Verificar autenticación
authService.isAuthenticated() // boolean

// Cerrar sesión
authService.logout() // void

// Obtener token
getToken() // string | null
```

---

## 🎨 Capturas de Pantalla

<div align="center">

### 🔑 Login Page
*Diseño split-screen con formulario minimalista y hero image*

### ✅ Verification Page  
*Inputs de código con auto-focus y soporte para paste*

### 🏠 Dashboard
*Panel de usuario con navegación lateral y tarjetas de destinos*

</div>

---

## 🗺️ Roadmap

<div align="center">

```mermaid
timeline
    title Roadmap del Proyecto
    
    section Fase 1 - Completado
        Enero 2026 : Sistema de autenticación
                   : UI/UX moderno
                   : Integración ReqRes
    
    section Fase 2 - Próximamente
        Febrero 2026 : Dark mode
                     : Internacionalización
                     : Tests unitarios
    
    section Fase 3 - Futuro
        Marzo 2026 : PWA Support
                   : Notificaciones push
                   : OAuth providers
```

</div>

### ✅ Completado

- [x] Sistema de login con Magic Link
- [x] Verificación por código de 6 dígitos
- [x] Registro de usuarios
- [x] Rutas protegidas
- [x] UI profesional responsive
- [x] Manejo de rate limiting

### 🔜 Próximamente

- [ ] Modo oscuro
- [ ] Soporte multi-idioma (i18n)
- [ ] Tests con Vitest
- [ ] Storybook para componentes
- [ ] CI/CD con GitHub Actions

---

## 👨‍💻 Autor

<div align="center">

<img src="https://avatars.githubusercontent.com/RodrigoSanchezDev" width="120" style="border-radius: 50%;" alt="Rodrigo Sánchez"/>

### **Rodrigo Sánchez**
#### Full Stack Developer

<br/>

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-sanchezdev.com-9B59B6?style=for-the-badge)](https://sanchezdev.com/)
[![Email](https://img.shields.io/badge/📧_Email-Rodrigo@sanchezdev.com-D44638?style=for-the-badge)](mailto:Rodrigo@sanchezdev.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectemos-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sanchezdev)
[![CV](https://img.shields.io/badge/📄_Currículum-Ver_CV-4CAF50?style=for-the-badge)](https://www.sanchezdev.com/documents/CV-Espanol.html)

[![Agenda](https://img.shields.io/badge/📅_Agenda_una_Llamada-Calendly-7C3AED?style=for-the-badge)](https://www.sanchezdev.com/es/agenda)

<br/>

*¿Tienes una idea de proyecto? Conversemos cómo puedo ayudarte.*

</div>

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,20&height=120&section=footer">
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,20&height=120&section=footer">
  <img alt="Footer" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,20&height=120&section=footer" width="100%">
</picture>

<div align="center">

**⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub ⭐**

© 2026 [Rodrigo Sánchez](https://sanchezdev.com) — All rights reserved.

</div>
