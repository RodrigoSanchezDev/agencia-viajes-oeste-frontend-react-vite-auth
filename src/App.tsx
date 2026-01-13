import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/AppRoutes';
import { authService } from './features/auth/services/authService';

// Basename para GitHub Pages (en dev es "", en prod es el nombre del repo)
const basename = import.meta.env.BASE_URL;

function App() {
  // Inicializar usuarios existentes en ReqRes (solo la primera vez)
  useEffect(() => {
    // Tu usuario ya existe en ReqRes, lo registramos localmente
    authService.initExistingUser('rodr.sanchezc@duocuc.cl');
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
