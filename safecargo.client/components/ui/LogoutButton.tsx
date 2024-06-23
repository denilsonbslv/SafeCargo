import React from 'react';
import { useRouter } from 'next/router';
import { logout } from '../../services/authService';
import Button from './Button';
import { useAuth } from '../../contexts/authContext';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { setAuthInfo } = useAuth();

  const handleLogout = async () => {
    await logout();
    const userInfo = {
      username: String(null),
      codLevel: String(null),
    };
    setAuthInfo(userInfo);
    router.push('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
