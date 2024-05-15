import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getUserSessions = async (userId: number) => {
  try {
    const response = await axiosInstance.post("users/getUserSessions", {
      userId: userId,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};
