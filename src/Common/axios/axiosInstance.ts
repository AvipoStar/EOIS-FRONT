import axios from "axios";

export const baseURL = 'http://127.0.0.1:8000/'

// Общий Axios Instance для вызова Api
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  },
});