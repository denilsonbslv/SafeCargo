import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import PropTypes from 'prop-types';
import LoadingSpinner from './components/LoadingSpinner';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default AppRoutes;
