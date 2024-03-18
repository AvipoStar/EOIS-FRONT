import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { IBoard } from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";

export const setBoard = async (board: IBoard) => {
  const response = await axiosInstance.post("taskmanager/createBoard", {
    name: board.name,
    description: board.description,
    firmId: board.firm,
    coverColor: board.coverColor,
  });
  return response.data;
};
