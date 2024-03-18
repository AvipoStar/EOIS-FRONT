import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getSessions = async (search: string) => { 
    const response = await axiosInstance.post(`session/getSessions`, search);
  return response.data;
 }