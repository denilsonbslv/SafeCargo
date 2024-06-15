import styled from 'styled-components';

export const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type }) =>
    type === 'success' ? '#dff0d8' : '#f2dede'};
  color: ${({ type }) => (type === 'success' ? '#3c763d' : '#a94442')};
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

export const AlertIcon = styled.div`
  margin-right: 10px;
`;

export const AlertMessage = styled.div`
  flex: 1;
`;

export const AlertButton = styled.button`
  background-color: ${({ type }) =>
    type === 'success' ? '#4cae4c' : '#d9534f'};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${({ type }) =>
      type === 'success' ? '#449d44' : '#c9302c'};
  }
  margin-left: 10px;
`;
