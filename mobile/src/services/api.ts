import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = 'http://192.168.1.7:8080/api/glic';

export const api = axios.create({
  baseURL: API_URL,
//   timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
