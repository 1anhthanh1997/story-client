import axios from "axios";
import { API_CONFIG } from "./apiConfig/config";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
  timeout: API_CONFIG.TIMEOUT,
});

// Add request interceptor for common headers or authentication
api.interceptors.request.use(
  (config) => {
    // You can add auth token here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized
      // await refreshToken();
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Example GET request
  get: async <T>(endpoint: string) => {
    const response = await api.get<T>(endpoint);
    return response.data;
  },

  // Example POST request
  post: async <T>(endpoint: string, data: any) => {
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },

  // Example PUT request
  put: async <T>(endpoint: string, data: any) => {
    const response = await api.put<T>(endpoint, data);
    return response.data;
  },

  // Example DELETE request
  delete: async <T>(endpoint: string) => {
    const response = await api.delete<T>(endpoint);
    return response.data;
  },
};
