import { useState, useEffect } from 'react';
import { fetchAccessLevels, createAccessLevel, updateAccessLevel, deleteAccessLevel } from '../../services/api';
import AccessLevelForm from '../components/AccessLevel/AccessLevelForm';
import AccessLevelModal from '../components/AccessLevel/AccessLevelModal';
import AccessLevelTable from '../components/AccessLevel/AccessLevelTable';
import Alert from '../components/Alert/Alert';

const AccessLevels = () => {
  const [accessLevels, setAccessLevels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '', duration: 5 });

  useEffect(() => {
    const getAccessLevels = async () => {
      try {
        const levels = await fetchAccessLevels();
        setAccessLevels(levels);
      } catch (error) {
        console.error('Failed to fetch access levels:', error);
      }
    };

    getAccessLevels();
  }, []);

  const handleCreate = async (level) => {
    try {
      const newLevel = await createAccessLevel(level);
      setAccessLevels([...accessLevels, newLevel]);
      setShowModal(false);
      setAlert({ show: true, type: 'success', message: 'Nível de acesso criado com sucesso!', duration: 3 });
    } catch (error) {
      console.error('Failed to create access level:', error);
      setAlert({ show: true, type: 'error', message: 'Erro ao criar nível de acesso.', duration: 3 });
    }
  };

  const handleUpdate = async (level) => {
    try {
      const updatedLevel = await updateAccessLevel(level);
      setAccessLevels(accessLevels.map(l => (l.codLevel === level.codLevel ? updatedLevel : l)));
      setShowModal(false);
      setAlert({ show: true, type: 'success', message: 'Nível de acesso atualizado com sucesso!', duration: 3 });
    } catch (error) {
      console.error('Failed to update access level:', error);
      setAlert({ show: true, type: 'error', message: 'Erro ao atualizar nível de acesso.', duration: 3 });
    }
  };

  const handleDelete = async (codLevel) => {
    try {
      await deleteAccessLevel(codLevel);
      setAccessLevels(accessLevels.filter(level => level.codLevel !== codLevel));
      setAlert({ show: true, type: 'success', message: 'Nível de acesso excluído com sucesso!', duration: 3 });
    } catch (error) {
      console.error('Failed to delete access level:', error);
      setAlert({ show: true, type: 'error', message: 'Erro ao excluir nível de acesso.', duration: 3 });
    }
  };

  const handleShowModal = (level) => {
    setCurrentLevel(level);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setCurrentLevel(null);
    setShowModal(false);
  };

  return (
    <div>
      <h1>Gerenciamento de Níveis de Acesso</h1>
      <button onClick={() => handleShowModal(null)}>Adicionar Nível de Acesso</button>
      <AccessLevelTable
        accessLevels={accessLevels}
        onEdit={handleShowModal}
        onDelete={handleDelete}
      />
      <AccessLevelModal show={showModal} onClose={handleHideModal}>
        <AccessLevelForm
          level={currentLevel}
          onSave={currentLevel ? handleUpdate : handleCreate}
          onCancel={handleHideModal}
        />
      </AccessLevelModal>
      {alert.show && <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} duration={alert.duration} />}
    </div>
  );
};

export default AccessLevels;
