import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import { validateToken, refreshToken } from '../services/authService';

export const getAuthServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = cookie.parse(req.headers.cookie || '');
  const authToken = cookies.AuthToken;

  if (authToken) {
    try {
      const valid = await validateToken(authToken);

      if (valid) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.log('Token inválido:', error);
    }

    try {
      const valid = await refreshToken(authToken);
      if (valid) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.log('Erro ao atualizar o token:', error);
    }
  }

  // Limpar cookies se o token for inválido ou não existir
  res.setHeader('Set-Cookie', [
    cookie.serialize('codLevel', '', { path: '/', expires: new Date(0) }),
    cookie.serialize('username', '', { path: '/', expires: new Date(0) }),
  ]);

  return {
    props: {},
  };
};
