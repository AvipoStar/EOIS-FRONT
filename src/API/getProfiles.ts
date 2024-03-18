import { axiosInstance } from "../Common/axios/axiosInstance";

export const getProfiles = async () => {
  const response = await axiosInstance.get("/profiles/getProfiles");
  return response.data;
};
