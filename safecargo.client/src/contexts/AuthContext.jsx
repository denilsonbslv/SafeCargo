import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('http://localhost:5246/api/Auth/validate-token', { token });
          if (response.status === 200) {
              setIsAuthenticated(true);
              setUser(response.data.user);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null); // Limpa o estado do usu�rio
          }
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null); // Limpa o estado do usu�rio
        }
      } else {
        setIsAuthenticated(false);
        setUser(null); // Limpa o estado do usu�rio
      }
      setIsLoading(false);
    };
    validateToken();
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
    setLoginSuccess(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, loginSuccess, setLoginSuccess, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
