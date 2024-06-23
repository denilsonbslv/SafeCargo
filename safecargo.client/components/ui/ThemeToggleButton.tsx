import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { darkTheme } from '../../styles/themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

/**
 * Componente ThemeToggleButton
 *
 * Este componente renderiza um botão que alterna entre os temas claro e escuro.
 *
 * @component
 */
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkTheme = theme === darkTheme;

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-3 rounded-full shadow-lg flex items-center justify-center focus:outline-none transition-colors duration-300 transform hover:scale-110 ${
        isDarkTheme ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
      }`}
      style={{ zIndex: 1000 }}
    >
      {isDarkTheme ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-400" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
