import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import CustomHead from '../components/CustomHead';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';
import CustomAlert from '../components/ui/CustomAlert';
import Input from '../components/ui/Input';
import PasswordInput from '../components/ui/PasswordInput';
import { login, refreshToken, validateToken } from '../services/authService';
import { useAuth, validateServerSideAuth } from '../contexts/authContext';

const Login = () => {
  const { theme } = useTheme();
  const { setAuthInfo } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>(
    'success'
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await login(username, password);
      const userInfo = {
        username: data.user.username,
        codLevel: data.user.codLevel,
      };
      setAuthInfo(userInfo);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage('Ocorreu um erro desconhecido.');
      }
      setAlertType('error');
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.textColor,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <CustomHead title="Login" />
      <div
        className={`p-8 rounded-lg shadow-lg w-full max-w-md ${
          theme.background === '#1e1e1e' ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{
          paddingTop: '30px',
          paddingBottom: '30px',
          paddingLeft: '80px',
          paddingRight: '80px',
        }}
      >
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={150}
            priority={true}
            className="mb-6"
            style={{
              filter: `drop-shadow(0 0 5px ${theme.logoShadowColor})`,
              marginBottom: '20px',
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="username"
            label="Nome de Usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            theme={theme}
            required
          />
          <PasswordInput
            id="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            theme={theme}
            required
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-1/3 bg-teal-500 text-white hover:bg-teal-600"
              disabled={loading}
              loading={loading}
            >
              Entrar
            </Button>
          </div>
        </form>
        {alertVisible && (
          <CustomAlert
            type={alertType}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
            duration={5}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await validateServerSideAuth(ctx);
  return auth;
};

export default Login;
