import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getBoards = async (firmId: number) => {
  const response = await axiosInstance.get(`taskmanager/getBoards/${firmId}`);
  return response.data;
};
