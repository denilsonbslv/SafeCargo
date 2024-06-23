// hoc/withAuth.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';

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

    useEffect(() => {
      if (!loading) {
        if (!codLevel) {
          router.push('/login');
        } else if (codLevel !== requiredCodLevel) {
          router.push('/');
        }
      }
    }, [codLevel, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // Pode substituir por um spinner ou outro componente de carregamento
    }

    if (!codLevel || codLevel !== requiredCodLevel) {
      return null;
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
