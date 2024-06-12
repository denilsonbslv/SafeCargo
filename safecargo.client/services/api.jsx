import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // altere para a URL correta do seu backend
});

export default api;