import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const moveList = async (columnId: number, newSerialNumber: number) => {
  try {
    const response = await axiosInstance.post("taskmanager/moveList", {
      columnId: columnId,
      newSerialNumber: newSerialNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при перемещении колонки:", error);
    throw error;
  }
};
