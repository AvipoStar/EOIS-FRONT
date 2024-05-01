import { axiosInstance } from "../Common/axios/axiosInstance";

export const getTaskPriorities = async () => {
  const response = await axiosInstance.get("taskmanager/getTaskPriorities");
  return response.data;
};
