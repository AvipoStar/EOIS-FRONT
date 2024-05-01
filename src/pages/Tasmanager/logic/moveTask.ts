import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const moveTask = async (
  taskId: number,
  newListId: number,
  newSerialNumber: number
) => {
  try {
    const response = await axiosInstance.post("taskmanager/moveTask", {
      taskId: taskId,
      newListId: newListId,
      newSerialNumber: newSerialNumber,
    });
    return response.data; // Возвращаем данные ответа, если необходимо
  } catch (error) {
    console.error("Ошибка при перемещении задачи:", error);
    throw error; // Можно обработать ошибку или передать ее выше
  }
};
