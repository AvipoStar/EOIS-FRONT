import axios from "axios";

// export const baseURL = 'https://progfactory.ru/'
export const baseURL = 'http://localhost:8000/'

// Общий Axios Instance для вызова Api
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  },
});