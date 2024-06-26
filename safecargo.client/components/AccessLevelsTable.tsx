import React from 'react';
import { AccessLevelDTO } from '../types/types';
import Button from './ui/Button';

interface AccessLevelsTableProps {
  accessLevels: AccessLevelDTO[];
  onEdit: (accessLevel: AccessLevelDTO) => void;
  onDelete: (codLevel: string) => void;
}

const AccessLevelsTable: React.FC<AccessLevelsTableProps> = ({
  accessLevels,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="min-w-full bg-gray-800">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b-2 border-gray-600 text-left text-white">
            Código
          </th>
          <th className="py-2 px-4 border-b-2 border-gray-600 text-left text-white">
            Nome
          </th>
          <th className="py-2 px-4 border-b-2 border-gray-600 text-left text-white">
            Descrição
          </th>
          <th className="py-2 px-4 border-b-2 border-gray-600 text-left text-white">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {accessLevels.map((level) => (
          <tr key={level.codLevel}>
            <td className="py-2 px-4 border-b border-gray-600 text-white">
              {level.codLevel}
            </td>
            <td className="py-2 px-4 border-b border-gray-600 text-white">
              {level.descLevel}
            </td>
            <td className="py-2 px-4 border-b border-gray-600 text-white">
              {level.description}
            </td>
            <td className="py-2 px-4 border-b border-gray-600 text-white flex items-center space-x-2">
              <Button
                onClick={() => onEdit(level)}
                className="bg-teal-500 hover:bg-teal-600 text-white transition-transform transform hover:scale-105"
              >
                Editar
              </Button>
              <Button
                onClick={() => onDelete(level.codLevel)}
                className="bg-red-500 hover:bg-red-600 text-white transition-transform transform hover:scale-105"
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccessLevelsTable;
