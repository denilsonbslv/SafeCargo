
import PropTypes from 'prop-types';
import { StyledButton } from './Button.styles';

// Componente de botão reutilizável
const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default Button;
