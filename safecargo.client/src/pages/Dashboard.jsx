import { useState, useEffect } from 'react';
import Alert from '../components/Alert/Alert';

const Dashboard = () => {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const showAlert = sessionStorage.getItem('showAlert') === 'true';
    if (showAlert) {
      setAlert({ show: true, type: 'success', message: 'Login bem-sucedido. Bem-vindo ao dashboard!' });
      sessionStorage.removeItem('showAlert'); // Remove o estado para que o alerta não apareça novamente
    }
  }, []);

  return (
    <div>
      {alert.show && <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}
      <h1>Dashboard</h1>
      {/* Outros componentes do dashboard */}
    </div>
  );
};

export default Dashboard;
