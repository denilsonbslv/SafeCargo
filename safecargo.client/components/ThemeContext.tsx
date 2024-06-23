// components/ThemeContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { darkTheme, lightTheme, Theme } from '../styles/themes';

// Interface para o contexto de tema
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Criação do contexto com valor inicial nulo
const ThemeContext = createContext<ThemeContextType | null>(null);

// Chave do localStorage para salvar o tema
const LOCAL_STORAGE_KEY = 'safeCargoTheme';

// Provedor de Tema para gerenciar e fornecer o tema atual
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Função para carregar o tema do localStorage
  const loadTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme === 'dark' ? darkTheme : lightTheme;
      }
    }
    return lightTheme;
  };

  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [mounted, setMounted] = useState(false);

  // Efeito para marcar o componente como montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efeito para atualizar as variáveis CSS do tema e salvar o tema no localStorage
  useEffect(() => {
    if (mounted) {
      Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(
          `--${key}`,
          theme[key as keyof Theme]
        );
      });
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        theme === darkTheme ? 'dark' : 'light'
      );
    }
  }, [theme, mounted]);

  // Função para alternar entre os temas claro e escuro
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
