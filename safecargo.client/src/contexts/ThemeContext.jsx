import { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

const ThemeContext = createContext();

const ThemeProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === lightTheme ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProviderComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeProviderComponent };
