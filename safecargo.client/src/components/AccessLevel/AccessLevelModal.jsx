import PropTypes from 'prop-types';
import { ModalContainer, ModalContent } from './AccessLevelModal.styles';

const AccessLevelModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

AccessLevelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccessLevelModal;
