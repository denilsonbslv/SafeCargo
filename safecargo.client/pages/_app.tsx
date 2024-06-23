// pages/_app.tsx

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
import { AuthProvider } from '../contexts/authContext';

/**
 * Componente MyApp
 *
 * Este componente inicializa todas as páginas da aplicação.
 * Utilizado para aplicar provedores de contexto e estilos globais.
 *
 * @param {AppProps} appProps - Propriedades da aplicação
 * @returns {JSX.Element} Componente inicializado
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <ThemeToggleButton />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
