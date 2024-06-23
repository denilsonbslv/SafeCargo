import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1; 
  }
  to {
    opacity: 0;
  }
`;

export const ToggleButton = styled.button<{ theme: { textColor: string } }>`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  &:focus {
    outline: none;
  }
  &:hover svg {
    color: ${({ theme }) => theme.textColor};
  }
`;
