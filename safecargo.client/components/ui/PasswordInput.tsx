// components/ui/PasswordInput.tsx

import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  theme: { background: string; textColor: string };
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  theme,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 relative">
      <label
        htmlFor={id}
        className="block text-center text-sm font-medium mb-2"
      >
        {label}
      </label>
      <div className="relative w-full max-w-sm mx-auto">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          className={`w-full px-3 py-2 border rounded-md text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
            theme.background === '#1e1e1e'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-black'
          }`}
          value={value}
          onChange={onChange}
          required={required}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none flex items-center justify-center"
          style={{ height: '100%' }}
        >
          {showPassword ? (
            <EyeSlashIcon
              className={`h-6 w-6 transition-colors duration-300 ${
                theme.background === '#1e1e1e'
                  ? 'text-gray-600 hover:text-white'
                  : 'text-gray-600 hover:text-black'
              }`}
            />
          ) : (
            <EyeIcon
              className={`h-6 w-6 transition-colors duration-300 ${
                theme.background === '#1e1e1e'
                  ? 'text-gray-600 hover:text-white'
                  : 'text-gray-600 hover:text-black'
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
