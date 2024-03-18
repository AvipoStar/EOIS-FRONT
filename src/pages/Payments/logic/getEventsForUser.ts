import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getEventsForUser = async (userId: number) => {
  const response = await axiosInstance.post("events/getEventsForUser", {userId: userId});
  return response.data;
};
