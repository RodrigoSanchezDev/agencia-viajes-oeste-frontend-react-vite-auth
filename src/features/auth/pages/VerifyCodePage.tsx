import React, { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button, Alert } from '../../../components/ui';
import { authService } from '../services/authService';
import { 
  HiOutlineMail,
  HiOutlineArrowLeft,
  HiOutlineRefresh
} from 'react-icons/hi';
import './VerifyCodePage.css';

export const VerifyCodePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirigir si no hay email
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  // Countdown para reenviar código
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Solo números
    
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Solo un dígito
    setCode(newCode);

    // Auto-focus al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setApiError('Ingresa el código completo de 6 dígitos');
      return;
    }

    setIsLoading(true);

    try {
      await authService.verifyCode(email, fullCode);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Error al verificar el código.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(30);
    setApiError('');

    try {
      await authService.requestCode({ email });
    } catch {
      setApiError('Error al reenviar código.');
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        <Link to="/login" className="verify-back">
          <HiOutlineArrowLeft /> Volver al inicio
        </Link>

        <div className="verify-icon">
          <HiOutlineMail />
        </div>

        <h1 className="verify-title">Verificación</h1>
        <p className="verify-subtitle">
          Revisa tu correo e ingresa el código recibido
        </p>

        <div className="verify-email-box">
          <span>Código enviado a</span>
          <strong>{email}</strong>
        </div>

        <form onSubmit={handleSubmit} className="verify-form">
          {apiError && <Alert type="error" message={apiError} onClose={() => setApiError('')} />}

          <div className="verify-code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="verify-code-input"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Verificar código
          </Button>

          <button 
            type="button" 
            className="verify-resend"
            onClick={handleResendCode}
            disabled={resendDisabled}
          >
            <HiOutlineRefresh className={resendDisabled ? 'spinning' : ''} />
            {resendDisabled 
              ? `Reenviar código en ${countdown}s` 
              : 'Reenviar código'
            }
          </button>
        </form>
      </div>
    </div>
  );
};
