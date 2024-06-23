import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  theme: { background: string; textColor: string };
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  theme,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-center text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`w-full max-w-sm mx-auto px-3 py-2 border rounded-md text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
          theme.background === '#1e1e1e'
            ? 'bg-gray-700 text-white'
            : 'bg-gray-100 text-black'
        }`}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
