import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.boxBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* Espaçamento entre os botões */
  margin-top: 20px;
`;

export const ConfirmButton = styled(motion.button)`
  padding: 10px 20px;
  background: ${({ theme }) => theme.buttonBackground};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

export const CancelButton = styled(motion.button)`
  padding: 10px 20px;
  background: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: darkred;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.buttonBackground};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }
`;
