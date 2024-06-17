import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
`;

export const LoginBox = styled(motion.div)`
  background: ${({ theme }) => theme.boxBackground};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 300px; 
  height: 300px; 

  @media (max-width: 768px) {
    padding: 20px;
    height: auto; /* Ajusta a altura para caber em telas menores */
  }
`;

export const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 5px ${({ theme }) => theme.logoShadowColor});
`;

export const StyledInput = styled(motion.input)`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme, invalid }) => (invalid ? 'red' : theme.inputBorder)};
  border-radius: 5px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  &::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
  }

  @media (max-width: 768px) {
    padding: 8px;
    margin-bottom: 15px;
  }
`;

export const StyledButton = styled(motion.button)`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  background: ${({ theme }) => theme.buttonBackground};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }

  @media (max-width: 768px) {
    padding: 8px;
    max-width: 130px;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.textColor};
  &:hover {
    color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;
