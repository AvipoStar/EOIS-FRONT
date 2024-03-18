import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const changeLoginPassword = async (
  userId: number,
  login: string,
  password: string
) => {
  const response = await axiosInstance.post("users/changeLoginPassword", {
    id: userId,
    newLogin: login,
    newPassword: password,
  });
  return response.data;
};
