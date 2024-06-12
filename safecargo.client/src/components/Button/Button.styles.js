import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
  max-width: 400px;
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
  margin-bottom: 30px; /* Aumentar o espaçamento */
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px; /* Bordas arredondadas */
  font-size: 16px;
  background-color: #fff;
  font-family: 'Roboto', sans-serif; /* Garantir a consistência da fonte */
`;

export const StyledButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  margin: 20px 0;
  border: none;
  border-radius: 8px; /* Bordas arredondadas */
  background-color: #10a89e; /* Nova cor fornecida */
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Roboto', sans-serif; /* Garantir a consistência da fonte */

  &:hover {
    background-color: #0e8f87; /* Tom mais escuro para hover */
    scale: 1.05;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 16px;
  }
`;
