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
    if (API_CONFIG.DEBUG) {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        params: config.params,
        data: config.data,
      });
    }

    // You can add auth token here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    if (API_CONFIG.DEBUG) {
      console.error("❌ Request Interceptor Error:", error);
    }
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (API_CONFIG.DEBUG) {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    if (API_CONFIG.DEBUG) {
      console.error("❌ API Response Error:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        data: error.response?.data,
        isNetworkError: !error.response,
        isTimeout: error.code === "ECONNABORTED",
      });
    }

    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized
      // await refreshToken();
    }

    // Enhanced error messages for common issues
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        error.message = "Request timeout - server took too long to respond";
      } else if (error.message === "Network Error") {
        error.message = `Network Error - Cannot connect to ${error.config?.baseURL}. Please check if the server is running.`;
      } else {
        error.message = `Connection failed - ${error.message}`;
      }
    }

    return Promise.reject(error);
  }
);

export const apiService = {
  // Example GET request
  get: async <T>(endpoint: string, params?: any) => {
    if (API_CONFIG.DEBUG) {
      console.log("🔍 GET Request:", {
        endpoint,
        params,
        fullURL: `${API_CONFIG.BASE_URL}${endpoint}`,
      });
    }

    try {
      const response = await api.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      if (API_CONFIG.DEBUG) {
        console.error("❌ GET Request Failed:", {
          endpoint,
          params,
          error: error instanceof Error ? error.message : String(error),
        });
      }
      throw error;
    }
  },

  // Example POST request
  post: async <T>(endpoint: string, data: any) => {
    if (API_CONFIG.DEBUG) {
      console.log("📤 POST Request:", {
        endpoint,
        data,
        fullURL: `${API_CONFIG.BASE_URL}${endpoint}`,
      });
    }

    try {
      const response = await api.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      if (API_CONFIG.DEBUG) {
        console.error("❌ POST Request Failed:", {
          endpoint,
          data,
          error: error instanceof Error ? error.message : String(error),
        });
      }
      throw error;
    }
  },

  // Example PUT request
  put: async <T>(endpoint: string, data: any) => {
    if (API_CONFIG.DEBUG) {
      console.log("🔄 PUT Request:", {
        endpoint,
        data,
        fullURL: `${API_CONFIG.BASE_URL}${endpoint}`,
      });
    }

    try {
      const response = await api.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      if (API_CONFIG.DEBUG) {
        console.error("❌ PUT Request Failed:", {
          endpoint,
          data,
          error: error instanceof Error ? error.message : String(error),
        });
      }
      throw error;
    }
  },

  // Example DELETE request
  delete: async <T>(endpoint: string) => {
    if (API_CONFIG.DEBUG) {
      console.log("🗑️ DELETE Request:", {
        endpoint,
        fullURL: `${API_CONFIG.BASE_URL}${endpoint}`,
      });
    }

    try {
      const response = await api.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      if (API_CONFIG.DEBUG) {
        console.error("❌ DELETE Request Failed:", {
          endpoint,
          error: error instanceof Error ? error.message : String(error),
        });
      }
      throw error;
    }
  },

  // Test connection method
  testConnection: async () => {
    try {
      const response = await api.get("/stories?limit=1");
      return {
        success: true,
        status: response.status,
        data: response.data,
        baseURL: API_CONFIG.BASE_URL,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        baseURL: API_CONFIG.BASE_URL,
        isNetworkError: !error.response,
        isTimeout: error.code === "ECONNABORTED",
      };
    }
  },
};
