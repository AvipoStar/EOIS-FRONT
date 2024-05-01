import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getTasksOnBoard = async (boardId: number) => {
  const response = await axiosInstance.get(
    `taskmanager/getTasksOnBoard/${boardId}`
  );
  return response.data;
};
