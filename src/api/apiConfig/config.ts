// API Configuration
export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: process.env.REACT_PUBLIC_API_URL || "http://localhost:3000",

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
} as const;
