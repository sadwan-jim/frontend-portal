import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // Use VITE_ environment variable
});

// Optionally, you can set default headers or interceptors here
//axiosInstance.defaults.headers.common['Authorization'] = 'Bearer your_token';  // Example header

export default axiosInstance;
