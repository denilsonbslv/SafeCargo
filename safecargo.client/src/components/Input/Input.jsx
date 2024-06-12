
import PropTypes from 'prop-types';
import { StyledInput } from './Input.styles';

// Componente de input reutilizável
const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
