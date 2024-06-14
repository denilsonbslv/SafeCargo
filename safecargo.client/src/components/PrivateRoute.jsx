import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, ...rest }) => {
    PrivateRoute.propTypes = {
        element: PropTypes.node.isRequired,
    };
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
