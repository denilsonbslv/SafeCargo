import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 4px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.inputBackground};
`;

export const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonTextColor};

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
