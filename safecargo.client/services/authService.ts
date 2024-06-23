import apiClient from './apiClient';

export const login = async (username: string, password: string) => {
  const response = await apiClient.post(
    '/auth/login',
    { username, password },
    { withCredentials: true }
  );

  const { user } = response.data;
  if (user && user.username && user.codLevel) {
    document.cookie = `username=${user.username}; path=/; codLevel=${user.codLevel}; path=/;`;
  }

  return response.data;
};

export const logout = async () => {
  await apiClient.post('/auth/logout', {}, { withCredentials: true });
};

export const validateToken = async (token: string) => {
  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await apiClient.post(
      '/auth/validate-token',
      {},
      {
        headers: {
          Cookie: `AuthToken=${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao validar o token:', error);
    throw new Error('Token inválido');
  }
};

export const refreshToken = async (token: string) => {
  try {
    const response = await apiClient.post(
      '/auth/refresh-token',
      {},
      {
        headers: {
          Cookie: `AuthToken=${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o token:', error);
    throw new Error('Erro ao atualizar o token');
  }
};
