import { useState, useEffect, SetStateAction } from 'react';
import AccessLevelsTable from '../../components/AccessLevelsTable';
import AccessLevelForm from '../../components/AccessLevelForm';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import withAuth from '../../hoc/withAuth';
import { useTheme } from '../../contexts/ThemeContext';
import {
  getAccessLevels,
  deleteAccessLevel,
  saveAccessLevel,
} from '../../services/accessLevelService';
import { AccessLevelDTO } from '../../types/types';

const AccessLevelsPage: React.FC = () => {
  const { theme } = useTheme();
  const [accessLevels, setAccessLevels] = useState<AccessLevelDTO[]>([]);
  const [selectedAccessLevel, setSelectedAccessLevel] =
    useState<AccessLevelDTO | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [accessLevelToDelete, setAccessLevelToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccessLevels();
      setAccessLevels(data);
    };
    fetchData();
  }, []);

  const handleSave = async (accessLevel: AccessLevelDTO) => {
    await saveAccessLevel(accessLevel);
    const data = await getAccessLevels();
    setAccessLevels(data);
    setIsFormVisible(false);
  };

  const handleDelete = async () => {
    if (accessLevelToDelete) {
      await deleteAccessLevel(accessLevelToDelete);
      const data = await getAccessLevels();
      setAccessLevels(data);
      setIsDeleteModalVisible(false);
    }
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.textColor }}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl mb-4">Gerenciamento de Níveis de Acesso</h1>
        <button
          className="mb-4 px-4 py-2 bg-teal-500 text-white rounded"
          onClick={() => setIsFormVisible(true)}
        >
          Adicionar Nível de Acesso
        </button>
        <AccessLevelsTable
          accessLevels={accessLevels}
          onEdit={(accessLevel: SetStateAction<AccessLevelDTO | null>) => {
            setSelectedAccessLevel(accessLevel);
            setIsFormVisible(true);
          }}
          onDelete={(codLevel: SetStateAction<string | null>) => {
            setAccessLevelToDelete(codLevel);
            setIsDeleteModalVisible(true);
          }}
        />
        {isFormVisible && (
          <AccessLevelForm
            accessLevel={selectedAccessLevel}
            onSave={handleSave}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalVisible(false)}
          isOpen={isDeleteModalVisible}
        />
      </div>
    </div>
  );
};

export default withAuth(AccessLevelsPage, 'ADMIN');
