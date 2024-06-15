import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {
  AlertContainer,
  AlertIcon,
  AlertMessage,
  AlertButton,
} from './Alert.styles';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Alert = ({ type, message, onClose, duration }) => {

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <AlertContainer type={type}>
      <AlertIcon>
        {type === 'success' ? (
          <FaCheckCircle size={20} />
        ) : (
          <FaTimesCircle size={20} />
        )}
      </AlertIcon>
      <AlertMessage>{message}</AlertMessage>
      <AlertButton type={type} onClick={onClose}>
        OK
      </AlertButton>
    </AlertContainer>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number, // Duração opcional em segundos
};

export default Alert;
