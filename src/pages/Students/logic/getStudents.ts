import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getStudents = async ( search: string, ) => {
  const response = await axiosInstance.post(`users/getAllStudents`, {
    search: search,
  });
  return response.data;
};
