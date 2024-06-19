import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5246/api',
});

// Interceptor para adicionar o token em cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const fetchAccessLevels = async () => {
  try {
    const response = await api.get('/accesslevel');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const createAccessLevel = async (level) => {
  validateAccessLevel(level);
  try {
    const response = await api.post('/accesslevel', level);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateAccessLevel = async (level) => {
  validateAccessLevel(level);
  try {
    const response = await api.put(`/accesslevel`, level);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteAccessLevel = async (codLevel) => {
    try {
        await api.delete(`/accesslevel/${codLevel}`);
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para validar os dados do nível de acesso
const validateAccessLevel = (level) => {
  if (!level.codLevel || !level.descLevel || !level.description) {
    throw new Error('Todos os campos são obrigatórios: codLevel, descLevel, description.');
  }
};

// Função para tratar erros da API
const handleApiError = (error) => {
    if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
    } else if (error.request) {
        console.error('Erro na solicitação:', error.request);
    } else {
        console.error('Erro:', error.message);
    }
};
