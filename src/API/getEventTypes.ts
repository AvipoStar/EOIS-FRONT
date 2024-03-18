import { axiosInstance } from "../Common/axios/axiosInstance";

export const getEventTypes = async () => {
  const response = await axiosInstance.get("events/getEventTypes");
  return response.data;
};
