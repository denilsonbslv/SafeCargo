import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/LoadingScreen';

interface WithAuthProps {
  requiredCodLevel: string;
}

const withAuth = (
  WrappedComponent: React.ComponentType,
  requiredCodLevel: string
) => {
  const WithAuth: React.FC<any> = (props) => {
    const { codLevel, loading } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!codLevel) {
          router.push('/login');
        } else if (codLevel !== requiredCodLevel) {
          router.push('/');
        } else {
          setIsAuthorized(true);
        }
      }
    }, [codLevel, loading, router]);

    if (loading || !isAuthorized) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

export default withAuth;

function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
