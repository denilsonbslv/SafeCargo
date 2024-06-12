import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5246/api',
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username: username,
            password: password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};
