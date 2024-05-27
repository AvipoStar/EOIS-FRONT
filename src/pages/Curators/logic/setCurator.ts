import { toast } from "react-toastify";
import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { IUser } from "../../LK/organless/LKPage";
import { convertDate4BD } from "../../../Common/functions/converDate";

export const setCurator = async (curator: IUser) => {
  await axiosInstance
    .post("users/createCurator", {
      name: curator.name,
      surname: curator.surname,
      patronymic: curator.patronymic,
      bornDate: convertDate4BD(curator.bornDate),
      gender: curator.gender,
      profileId: curator.profile,
      photoPath: "",
    })
    .then((res) => {
      toast.success("Куратор сохранен");
    })
    .catch((err) => {
      toast.error(err.response.data.detail);
    });
};
