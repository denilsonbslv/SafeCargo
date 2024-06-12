import React from 'react';
import ReactDOM from 'react-dom';
import App from '../services/api.jsx';
import GlobalStyles from '../styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
