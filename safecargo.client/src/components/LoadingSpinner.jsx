import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(FontAwesomeIcon)`
  animation: ${spin} 2s linear infinite;
  font-size: 3rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
`;

const LoadingSpinner = () => (
  <LoadingContainer>
    <Spinner icon={faSpinner} />
  </LoadingContainer>
);

export default LoadingSpinner;
