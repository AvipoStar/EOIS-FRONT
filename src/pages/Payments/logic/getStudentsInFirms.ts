import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getStudentsInFirms = async (firmIds: number[]) => {
  const response = await axiosInstance.post("users/getStudentsInFirms", {
    firmIds: firmIds,
  });
  return response.data;
};
