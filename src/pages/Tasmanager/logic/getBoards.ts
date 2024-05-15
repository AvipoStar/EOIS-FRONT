import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getBoards = async (firmId: number[]) => {
  const response = await axiosInstance.post(`taskmanager/getBoards`, {
    firmIds: firmId,
  });
  return response.data;
};
