import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.boxBackground};
  color: ${({ theme }) => theme.textColor};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  margin: 0 auto;
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.textColor};
`;

export const Input = styled(motion.input)`
  width: calc(100% - 20px); /* Subtrai o padding para evitar tocar a borda */
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  &::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
  }

  &:disabled {
    background: ${({ theme }) => theme.disabledBackground};
    color: ${({ theme }) => theme.disabledTextColor};
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* Espaçamento entre os botões */
`;

export const Button = styled(motion.button)`
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
