import PropTypes from 'prop-types';
import { Table, TableHeader, TableRow, TableCell, IconButton, DeleteButton, TableCellButtons } from './AccessLevelTable.styles';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AccessLevelTable = ({ accessLevels, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <tr>
          <th>Cod. Nível</th>
          <th>Nome do Nível de Acesso</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </TableHeader>
      <tbody>
        {accessLevels.map((level) => (
          <TableRow key={level.codLevel}>
            <TableCell>{level.codLevel}</TableCell>
            <TableCell>{level.descLevel}</TableCell>
            <TableCell>{level.description}</TableCell>
            <TableCellButtons>
              <IconButton data-tooltip="Editar" onClick={() => onEdit(level)}>
                <FaEdit />
              </IconButton>
              <DeleteButton data-tooltip="Excluir" onClick={() => onDelete(level.codLevel)}>
                <FaTrash />
              </DeleteButton>
            </TableCellButtons>
          </TableRow>
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
