import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalStyles;
