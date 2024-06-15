import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../components/Alert/Alert';

const Dashboard = () => {
  const { loginSuccess, setLoginSuccess } = useAuth();
  const [alert, setAlert] = useState({ show: false, type: '', message: '', duration: 5 });

  useEffect(() => {
    if (loginSuccess) {
      setAlert({ show: true, type: 'success', message: 'Login bem-sucedido.', duration: 2 });
    }
  }, [loginSuccess, setLoginSuccess]);

  return (
    <div>
      {alert.show && <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} duration={alert.duration} />}
      <h1>Dashboard</h1>
      {/* Rest of your dashboard content */}
    </div>
  );
};

export default Dashboard;
