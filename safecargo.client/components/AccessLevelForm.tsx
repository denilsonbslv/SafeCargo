import React, { useState, useEffect } from 'react';
import { AccessLevelDTO } from '../types/types';
import Button from './ui/Button';

interface AccessLevelFormProps {
  accessLevel: AccessLevelDTO | null;
  onSave: (accessLevel: AccessLevelDTO) => void;
  onCancel: () => void;
}

const AccessLevelForm: React.FC<AccessLevelFormProps> = ({
  accessLevel,
  onSave,
  onCancel,
}) => {
  const [formState, setFormState] = useState<AccessLevelDTO>({
    codLevel: '',
    descLevel: '',
    description: '',
  });

  useEffect(() => {
    if (accessLevel) {
      setFormState(accessLevel);
    }
  }, [accessLevel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white">Código do Nível de Acesso</label>
          <input
            type="text"
            name="CodLevel"
            value={formState.codLevel}
            onChange={handleChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Nome do Nível de Acesso</label>
          <input
            type="text"
            name="DescLevel"
            value={formState.descLevel}
            onChange={handleChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Descrição</label>
          <input
            type="text"
            name="Description"
            value={formState.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="flex space-x-4">
          <Button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white transition-transform transform hover:scale-105"
          >
            Salvar
          </Button>
          <Button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white transition-transform transform hover:scale-105"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccessLevelForm;
