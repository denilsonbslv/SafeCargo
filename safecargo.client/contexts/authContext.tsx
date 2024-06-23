import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import {
  login as authServiceLogin,
  logout as authServiceLogout,
  validateToken,
  refreshToken,
} from '../services/authService';
import { GetServerSidePropsContext } from 'next';

interface AuthContextData {
  codLevel: string | null;
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthInfo: (userInfo: { codLevel: string; username: string }) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [codLevel, setCodLevel] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const setAuthInfo = (userInfo: { username: string; codLevel: string }) => {
    setCodLevel(userInfo.codLevel);
    document.cookie = `codLevel=${userInfo.codLevel}; path=/;`;
    setUsername(userInfo.username);
    document.cookie = `username=${userInfo.username}; path=/;`;
    setLoading(false);
  };

  const clearAuthInfo = () => {
    setCodLevel(null);
    setUsername(null);
    document.cookie = 'codLevel=; path=/; Max-Age=0';
    document.cookie = 'username=; path=/; Max-Age=0';
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await authServiceLogin(username, password);
      setAuthInfo({
        username: data.user.username,
        codLevel: data.user.codLevel,
      });
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authServiceLogout();
      clearAuthInfo();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = cookie.parse(document.cookie || '');
    const savedCodLevel = cookies.codLevel;
    const savedUsername = cookies.username;

    if (savedCodLevel && savedUsername) {
      setAuthInfo({ codLevel: savedCodLevel, username: savedUsername });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ codLevel, username, loading, login, logout, setAuthInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const validateServerSideAuth = async (
  ctx: GetServerSidePropsContext
) => {
  const { req, res } = ctx;
  const cookies = cookie.parse(req.headers.cookie || '');
  const authToken = cookies.AuthToken;

  if (authToken) {
    try {
      const valid = await validateToken(authToken);

      if (valid) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.log('Token inválido:', error);
    }

    try {
      await refreshToken(authToken);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } catch (error) {
      console.log('Erro ao atualizar o token:', error);
    }
  }

  // Limpar cookies se o token for inválido ou não existir
  res.setHeader('Set-Cookie', [
    cookie.serialize('codLevel', '', { path: '/', expires: new Date(0) }),
    cookie.serialize('username', '', { path: '/', expires: new Date(0) }),
  ]);

  return { props: {} };
};
