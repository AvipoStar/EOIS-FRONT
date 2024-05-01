import { toast } from "react-toastify";
import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { IUser } from "../../LK/organless/LKPage";

export const setCurator = async (curator: IUser) => {
  if (curator.id) {
    await axiosInstance
      .put("projects/updateProject", {
        id: curator.id,
        name: curator.name,
        surname: curator.surname,
        patronymic: curator.patronymic,
        bornDate: curator.bornDate,
        gender: curator.gender,
        profileId: curator.profile,
        photoPath: "",
      })
      .then((res) => {
        toast.success("Изменения сохранены");
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  } else {
    await axiosInstance
      .post("projects/createProject", {
        name: curator.name,
        surname: curator.surname,
        patronymic: curator.patronymic,
        bornDate: curator.bornDate,
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
  }
};
