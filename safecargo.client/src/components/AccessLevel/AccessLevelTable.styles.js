import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
  &:hover {
    color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
  &:hover {
    color: red;
  }
`;