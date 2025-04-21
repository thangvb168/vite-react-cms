import axios from 'axios';

const BASE_URL = 'https://67ee152e4387d9117bbf4f07.mockapi.io/api/v1/';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
