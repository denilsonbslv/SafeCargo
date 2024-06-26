import React from 'react';
import Button from './ui/Button';

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-700 p-4 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Confirmação de Exclusão</h2>
        <p className="mb-4">
          Tem certeza de que deseja excluir este nível de acesso?
        </p>
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white transition-transform transform hover:scale-105"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white transition-transform transform hover:scale-105"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
