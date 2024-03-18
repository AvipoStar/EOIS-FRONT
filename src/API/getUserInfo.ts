import { axiosInstance } from "../Common/axios/axiosInstance";

export const getUserInfo = async (userId: number) => {
    const response = await axiosInstance.get(`users/getUserById/${userId}`);
  return response.data;
};