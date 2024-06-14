import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Add 'children' to props validation
  PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
  };
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>; // ou um spinner
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
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
