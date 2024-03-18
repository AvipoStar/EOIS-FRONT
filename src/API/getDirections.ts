import { axiosInstance } from "../Common/axios/axiosInstance";

export const getDirections = async () => {
  const response = await axiosInstance.get("projects/getDirections");
  return response.data;
};
