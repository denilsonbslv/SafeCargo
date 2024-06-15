import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import GlobalStyles from '../styles/GlobalStyles';
import AppRoutes from './routes';
import { FaSun, FaMoon } from 'react-icons/fa';
import styled from 'styled-components';
import lightTheme from './themes/lightTheme';
import { AuthProvider } from './contexts/AuthContext';

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <AuthProvider>
      <GlobalStyles />
      <ThemeToggle onClick={toggleTheme}>
        {theme === lightTheme ? <FaMoon /> : <FaSun />}
      </ThemeToggle>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
