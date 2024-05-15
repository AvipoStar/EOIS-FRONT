import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const deleteBoard = async (boardId?: number) => {
  try {
    const response = await axiosInstance.delete(`taskmanager/deleteBoard`, {
      data: { boardId: boardId }, // Передача параметра boardId в теле запроса
    });

    return response.data;
  } catch (error) {
    console.error("Произошла ошибка при вызове API deleteBoard:", error);
    return null;
  }
};
