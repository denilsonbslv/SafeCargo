// components/ui/CustomAlert.tsx

import React, { useEffect } from 'react';
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

interface CustomAlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
  duration?: number; // Duração opcional em segundos
}

const alertStyles = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};

const iconStyles = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  error: <XCircleIcon className="h-6 w-6 text-red-500" />,
  warning: <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />,
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  type,
  message,
  onClose,
  duration,
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 border-l-4 p-4 mb-4 ${alertStyles[type]} flex items-center z-50`}
      style={{ width: '90%', maxWidth: '400px' }}
    >
      <div className="mr-4">{iconStyles[type]}</div>
      <div className="flex-grow">
        <p>{message}</p>
      </div>
      <button className="ml-4" onClick={onClose}>
        OK
      </button>
    </div>
  );
};

export default CustomAlert;
