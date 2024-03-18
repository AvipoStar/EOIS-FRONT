import { axiosInstance } from "../Common/axios/axiosInstance";

export const getRoles = async () => {
  const response = await axiosInstance.get("roles/getRoles");
  return response.data;
};
