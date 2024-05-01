import { toast } from "react-toastify";
import { axiosInstance } from "../Common/axios/axiosInstance";

export const checkToken = async (token: string) => {
  let response: any;
  await axiosInstance
    .post("authReg/checkToken", { token: token })
    .then((res) => {
      response = res.data;
      toast.success("Вход выполнен успешно");
    })
    .catch((err) => {
      toast.error(err.response.data.detail);
    });
  return response;
};
