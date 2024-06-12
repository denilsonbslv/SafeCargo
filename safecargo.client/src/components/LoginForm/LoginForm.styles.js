import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  padding-left: 60px;
  padding-right: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.boxBackground};
  width: 100%;
  max-width: 450px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

export const Logo = styled.img`
  width: 150px;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 5px ${({ theme }) => theme.logoShadowColor});
`;

export const StyledInput = styled(motion.input)`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 2px solid ${({ theme }) => theme.inputBorder}; /* Bordas mais espessas */
  border-radius: 8px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.textColor};

  &::placeholder {
    color: ${({ theme }) => theme.placeholderColor}; /* Cor mais clara para placeholders */
  }
`;

export const StyledButton = styled(motion.button)`
  width: 100%;
  padding: 14px;
  margin: 24px 0;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 16px;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 16px;
`;
