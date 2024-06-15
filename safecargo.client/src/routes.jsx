import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PropTypes from 'prop-types';
import LoadingSpinner from './components/LoadingSpinner';

const PrivateRoute = ({ element: Component, ...rest }) => {
  PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
  };

  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRoutes;
