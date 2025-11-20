import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: `${API_URL}/api/glic`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const publicRoutes = ['/auth/login', '/users', '/mail'];

  if (!publicRoutes.includes(config.url!)) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

