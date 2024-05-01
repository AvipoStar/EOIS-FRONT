import { axiosInstance } from '../../../Common/axios/axiosInstance'

export const getExecutors = async (firmId: number) => {
  const response = await axiosInstance.get(`taskmanager/getExecutors/${firmId}`);
  return response.data;
};
