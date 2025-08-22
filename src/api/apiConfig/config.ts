// API Configuration
const getBaseUrl = () => {
  // Check for environment variable first
  if (process.env.REACT_PUBLIC_API_URL) {
    return process.env.REACT_PUBLIC_API_URL;
  }

  // For development, use the computer's IP address instead of localhost
  if (__DEV__) {
    // Use your computer's actual IP address for Expo development
    return "http://192.168.1.138:3001/api";
  }

  // For production, use a production URL
  return "https://your-production-api.com/api";
};

export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: getBaseUrl(),

  // Default headers
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Timeout settings
  TIMEOUT: 30000, // 30 seconds

  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second

  // Debug mode
  DEBUG: __DEV__,
} as const;

// Log the current configuration in development
if (__DEV__) {
  console.log("🔧 API Configuration:", {
    BASE_URL: API_CONFIG.BASE_URL,
    DEBUG: API_CONFIG.DEBUG,
    TIMEOUT: API_CONFIG.TIMEOUT,
  });
}
