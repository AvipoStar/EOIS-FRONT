import { axiosInstance } from "../Common/axios/axiosInstance";

export const getFirmsOnCurrentSession = async () => {
  const response = await axiosInstance.get("firms/getFirmsOnCurrentSession");
  return response.data;
};
