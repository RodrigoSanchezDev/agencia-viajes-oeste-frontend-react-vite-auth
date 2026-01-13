import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { TextInput, Button, Alert } from '../../../components/ui';
import { authService } from '../services/authService';
import { validateEmail, validateRequired } from '../../../utils/validation';
import { 
  HiOutlinePaperAirplane, 
  HiOutlineMail
} from 'react-icons/hi';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const successMessage = location.state?.message;

  const validate = (): boolean => {
    const newErrors: { email?: string } = {};

    if (!validateRequired(email)) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.requestCode({ email });
      // Redirigir a página de verificación con el email
      navigate('/verify-code', { state: { email } });
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Error al enviar código. Verifica tu email.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left side - Hero Image */}
      <div className="login-hero">
        <div className="login-hero__overlay" />
        <div className="login-hero__content">
          <div className="login-hero__logo">
            <HiOutlinePaperAirplane className="login-hero__logo-icon" />
            <span className="login-hero__logo-text">Viajes Oeste</span>
          </div>
          <h1 className="login-hero__title">
            Descubre el mundo con nosotros
          </h1>
          <p className="login-hero__subtitle">
            Más de 10,000 destinos te esperan. Vive experiencias únicas en los lugares más increíbles del planeta.
          </p>
          <div className="login-hero__stats">
            <div className="login-hero__stat">
              <span className="login-hero__stat-number">10K+</span>
              <span className="login-hero__stat-label">Destinos</span>
            </div>
            <div className="login-hero__stat">
              <span className="login-hero__stat-number">50K+</span>
              <span className="login-hero__stat-label">Viajeros</span>
            </div>
            <div className="login-hero__stat">
              <span className="login-hero__stat-number">4.9</span>
              <span className="login-hero__stat-label">Rating</span>
            </div>
          </div>
        </div>
        <div className="login-hero__decoration">
          <div className="login-hero__circle login-hero__circle--1" />
          <div className="login-hero__circle login-hero__circle--2" />
          <div className="login-hero__circle login-hero__circle--3" />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-form__header">
            <h2 className="login-form__title">Iniciar Sesión</h2>
            <p className="login-form__subtitle">Ingresa tu correo electrónico para continuar</p>
          </div>

          <div className="login-form__credentials-box">
            <HiOutlineMail className="login-form__credentials-icon" />
            <div className="login-form__credentials-content">
              <p className="login-form__credentials-title">Demo - ReqRes</p>
              <p className="login-form__credentials-text">rodr.sanchezc@duocuc.cl</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {successMessage && <Alert type="success" message={successMessage} />}
            {apiError && <Alert type="error" message={apiError} onClose={() => setApiError('')} />}

            <TextInput
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="tucorreo@ejemplo.com"
              required
              autoComplete="email"
            />

            <p className="login-form__info">
              <HiOutlineMail />
              Recibirás un código de verificación en tu correo
            </p>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Continuar
            </Button>

            <div className="login-form__footer">
              <p>
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="login-form__link">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
