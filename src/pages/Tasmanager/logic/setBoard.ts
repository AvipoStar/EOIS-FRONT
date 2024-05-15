import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { IBoard } from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";

export const setBoard = async (board: IBoard) => {

  if(board.id)
    {
      const response = await axiosInstance.patch("taskmanager/editBoard", {
        id: board.id,
        name: board.name,
        description: board.description,
        coverColor: board.coverColor,
      });
      return response.data;
    }
    else{
      const response = await axiosInstance.post("taskmanager/createBoard", {
        name: board.name,
        description: board.description,
        firmId: board.firm,
        coverColor: board.coverColor,
      });
      return response.data;
    }
 
};
