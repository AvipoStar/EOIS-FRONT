import { axiosInstance } from "../Common/axios/axiosInstance";
import { IAuthData } from "../pages/Auth/organless/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthOrReg = async (authData: IAuthData, authOrReg: boolean) => {
  let response: any;
  if (authOrReg) {
    await axiosInstance
      .post("authReg/login", {
        login: authData.login,
        password: authData.password,
      })
      .then((res) => {
        response = res.data;
        toast.success("Вход выполнен успешно")
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  } else {
    await axiosInstance
      .post("authReg/register", {
        name: authData.name,
        surname: authData.surname,
        patronymic: authData.patronimyc,
        bornDate: authData.bornDate,
        gender: authData.gender,
        login: authData.login,
        password: authData.password,
      })
      .then((res) => {
        response = res.data;
        toast.success("Регистрация выполнена успешно")
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });;
  }
  return response;
};
