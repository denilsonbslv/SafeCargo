import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../../../services/api';
import { LoginContainer, LoginBox, Logo, StyledInput, StyledButton } from './LoginForm.styles';
import logo from '../../assets/logo.png';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });
  const navigate = useNavigate();

  useEffect(() => {
    setErrors({
      username: username.length > 0 && username.length < 3,
      password: password.length > 0 && password === ''
    });
  }, [username, password]);

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <LoginContainer>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <LoginBox>
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
  );
};

export default LoginForm;
