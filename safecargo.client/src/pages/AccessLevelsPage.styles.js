import styled from 'styled-components';

export const PageContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 1.5%;
  padding-right: 1.5%;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;