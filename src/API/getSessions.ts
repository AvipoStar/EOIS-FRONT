import { axiosInstance } from "../Common/axios/axiosInstance";

export const getSessions = async () => { 
    const response = await axiosInstance.post(`session/getSessions`, "");
  return response.data;
 }