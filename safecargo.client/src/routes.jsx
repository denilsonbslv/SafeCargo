import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AccessLevels from './pages/AccessLevels'; // Import the AccessLevels page
import Logout from './pages/Logout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PropTypes from 'prop-types';
import LoadingSpinner from './components/LoadingSpinner';

const PrivateRoute = ({ element: Component }) => {
  PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired, // Ensure this is a ReactNode
  };

  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/access-levels" element={<PrivateRoute element={<AccessLevels />} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRoutes;
