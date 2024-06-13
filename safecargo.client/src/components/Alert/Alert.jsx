import { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ type }) => (type === 'success' ? '#d4edda' : '#f8d7da')};
  color: ${({ type }) => (type === 'success' ? '#155724' : '#721c24')};
  border: 1px solid ${({ type }) => (type === 'success' ? '#c3e6cb' : '#f5c6cb')};
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  z-index: 1000;
  max-width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AlertIcon = styled.div`
  margin-right: 10px;
  font-size: 24px;
`;

const AlertMessage = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const AlertButton = styled.button`
  background: ${({ type }) => (type === 'success' ? '#28a745' : '#dc3545')};
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
`;

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AlertContainer
      type={type}
      role="alert"
      aria-live="assertive"
    >
      <AlertIcon>
        {type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
      </AlertIcon>
      <AlertMessage>{message}</AlertMessage>
      <AlertButton type={type} onClick={onClose}>OK</AlertButton>
    </AlertContainer>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
