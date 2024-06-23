// components/LoadingScreen.tsx
import React from 'react';
import Image from 'next/image';

const LoadingScreen: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#F5F5F5', // Cor de fundo clara
        color: '#333333', // Cor do texto mais escura
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        flexDirection: 'column',
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={150}
        height={150}
        priority={true}
        style={{
          filter: 'drop-shadow(0 0 5px #999)', // Cor da sombra ajustada
        }}
      />
      <div className="flex items-center mt-4">
        <svg
          className="animate-spin h-16 w-16" // Spinner maior
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          style={{ color: '#333333' }} // Cor do spinner mais escura
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
      <p
        style={{
          color: '#333333', // Cor do texto mais escura
          marginTop: '16px',
          fontSize: '1.25rem', // Tamanho da fonte maior
          fontWeight: 'bold', // Negrito para melhor visibilidade
        }}
      >
        Carregando, por favor, aguarde...
      </p>
    </div>
  );
};

export default LoadingScreen;
