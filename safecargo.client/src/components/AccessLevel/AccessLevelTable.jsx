import PropTypes from 'prop-types';
import { Table, IconButton } from './AccessLevelTable.styles';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AccessLevelTable = ({ accessLevels, onEdit, onDelete }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Cod. Nível</th>
          <th>Nome do Nível de Acesso</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {accessLevels.map((level) => (
          <tr key={level.codLevel}>
            <td>{level.codLevel}</td>
            <td>{level.descLevel}</td>
            <td>{level.description}</td>
            <td>
              <IconButton onClick={() => onEdit(level)}>
                <FaEdit />
              </IconButton>
              <IconButton onClick={() => onDelete(level.codLevel)}>
                <FaTrash />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

AccessLevelTable.propTypes = {
  accessLevels: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AccessLevelTable;
