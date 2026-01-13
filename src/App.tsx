import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/AppRoutes';
import { authService } from './features/auth/services/authService';

function App() {
  // Inicializar usuarios existentes en ReqRes (solo la primera vez)
  useEffect(() => {
    // Tu usuario ya existe en ReqRes, lo registramos localmente
    authService.initExistingUser('rodr.sanchezc@duocuc.cl');
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
