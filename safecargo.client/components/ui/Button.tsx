import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
