import PropTypes from 'prop-types';
import { ModalContainer, ModalContent, ButtonGroup, ConfirmButton, CancelButton } from './ConfirmationModal.styles';

const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <p>{message}</p>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>Sim</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalContainer>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
