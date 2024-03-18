import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const checkUserFirmRelation = async (userId: number) => {
  const response = await axiosInstance.post("users/checkUserFirmRelation", {
    userId: userId,
  });

  return response.data;
};
