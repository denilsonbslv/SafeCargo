import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { login } from '../../../services/api';
import { LoginContainer, LoginBox, Logo, StyledInput, StyledButton, ToggleButton } from './LoginForm.styles';
import logo from '../../assets/logo.png';

// Definição do tema claro
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

// Definição do tema escuro
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
  const [errors, setErrors] = useState({ username: false, password: false });
  const navigate = useNavigate();

  // Alterna entre temas claro e escuro
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  // Valida dinamicamente os campos de entrada
  useEffect(() => {
    setErrors({
      username: username.length > 0 && username.length < 3,
      password: password.length > 0 && password === ''
    });
  }, [username, password]);

  // Função de login
  const handleLogin = async () => {
    const newErrors = { username: false, password: false };
    if (username.length < 3) {
      newErrors.username = true;
    }
    if (password === '') {
      newErrors.password = true;
    }
    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return;
    }

    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.Token);
      navigate('/dashboard');
    } catch (error) {
      alert('Falha no login');
    }
  };

  // Ação ao pressionar a tecla Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
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
              onKeyDown={handleKeyDown}
              whileFocus={{ scale: 1.05 }}
              invalid={errors.username}
            />
            <StyledInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              whileFocus={{ scale: 1.05 }}
              invalid={errors.password}
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
