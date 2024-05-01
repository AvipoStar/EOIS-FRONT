import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const changeUser = async (
  userId: number,
  login: string,
  password: string,
  photoPath: any,
) => {
  const response = await axiosInstance.post("users/changeLoginPassword", {
    id: userId,
    newLogin: login,
    newPassword: password,
    photoPath,
  });
  return response.data;
};
