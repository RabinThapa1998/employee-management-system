const dev = import.meta.env.DEV;

export const API_BASE_URL = dev
  ? 'http://localhost:8000/api/v1/dashboard/'
  : process.env.VITE_API_BASE_URL!;
