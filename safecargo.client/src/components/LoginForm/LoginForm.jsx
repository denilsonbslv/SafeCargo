import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { LoginContainer, LoginBox, Logo, StyledInput, StyledButton, ToggleButton } from './LoginForm.styles';
import logo from '../../assets/logo.png'; // certifique-se de ter a logo na pasta assets

const lightTheme = {
  background: '#f0f2f5',
  boxBackground: '#fff',
  textColor: '#000',
  buttonBackground: '#10a89e',
  buttonHoverBackground: '#0e8f87',
  inputBackground: '#fff',
  inputBorder: '#ccc',
  placeholderColor: '#888',
  logoShadowColor: '#00000000'
};

const darkTheme = {
  background: '#1e1e1e',
  boxBackground: '#333',
  textColor: '#fff',
  buttonBackground: '#10a89e',
  buttonHoverBackground: '#0e8f87',
  inputBackground: '#555',
  inputBorder: '#777',
  placeholderColor: '#bbb',
  logoShadowColor: '#fff'
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState(lightTheme);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <LoginBox>
            <ToggleButton onClick={toggleTheme}>
              {theme === lightTheme ? 'Modo Noturno' : 'Modo Claro'}
            </ToggleButton>
            <Logo src={logo} alt="Logo" />
            <StyledInput
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
            <StyledInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
            <StyledButton 
              onClick={handleLogin} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrar
            </StyledButton>
          </LoginBox>
        </motion.div>
      </LoginContainer>
    </ThemeProvider>
  );
};

export default LoginForm;
