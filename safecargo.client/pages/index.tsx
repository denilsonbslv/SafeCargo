// pages/index.tsx

import React, { useEffect, useState } from 'react';
import CustomHead from '../components/CustomHead';
import { useTheme } from '../components/ThemeContext';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
import CustomAlert from '../components/ui/CustomAlert';
import Link from 'next/link';
import Button from '../components/ui/Button';
import LogoutButton from '@/components/ui/LogoutButton';

/**
 * Página Inicial
 *
 * Esta é a página inicial da aplicação, utilizando o contexto de tema.
 *
 * @component
 */
const Home = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.textColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CustomHead title="Página Inicial" />
      <main className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao SafeCargo</h1>
        <p className="mb-4">Esta é a página inicial da sua aplicação.</p>
        {alertVisible && (
          <CustomAlert
            type="success"
            message="Operação realizada com sucesso!"
            onClose={() => setAlertVisible(false)}
            duration={5}
          />
        )}
        <Link href="/about">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 mb-4">
            Saiba Mais
          </Button>
        </Link>
        <Link href="/login">
          <Button className="bg-teal-500 text-white hover:bg-teal-600">
            Login
          </Button>
        </Link>
        <LogoutButton />
        <ThemeToggleButton />
      </main>
    </div>
  );
};

export default Home;
