import { axiosInstance } from "../Common/axios/axiosInstance";

export const getMenu = async (userId: number) => {
  const response = await axiosInstance.post("/authReg/getMenu", {userId: userId});
  return response.data;
};
