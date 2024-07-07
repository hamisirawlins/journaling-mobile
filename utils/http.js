import axios from 'axios';
import supabase from '../supabase';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async config => {
        const token = await getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

apiClient.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

const http = {
    get: (url, params = {}, config = {}) => apiClient.get(url, { ...config, params }),
    post: (url, data, config = {}) => apiClient.post(url, data, config),
    put: (url, data, config = {}) => apiClient.put(url, data, config),
    delete: (url, config = {}) => apiClient.delete(url, config),
};

const getAuthToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Failed to retrieve session:', error);
        return null;
    }
    const token = data?.session.access_token;
    return token;
};

export default http;

