import PropTypes from 'prop-types';
import { Modal, ModalContent } from './AccessLevelModal.styles';

const AccessLevelModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Modal>
  );
};

AccessLevelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccessLevelModal;
