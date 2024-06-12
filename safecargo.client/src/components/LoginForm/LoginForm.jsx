import { useState } from 'react'; // Import the 'useState' hook from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { LoginContainer, LoginBox } from './LoginForm.styles';

// Componente de formulário de login
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    <LoginContainer>
      <LoginBox>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginForm;
