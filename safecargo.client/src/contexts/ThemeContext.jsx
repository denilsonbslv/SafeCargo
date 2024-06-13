import { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

const ThemeContext = createContext();

const ThemeProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
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
