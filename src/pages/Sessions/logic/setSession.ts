import { toast } from "react-toastify";
import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { ISession } from "../organless/SessionsPage";

export const setSession = async (session: ISession) => {
  if (session.id) {
    await axiosInstance
      .put("session/editSessions", {
        id: session.id,
        dateStart: session.dateStart,
        dateEnd: session.dateEnd,
        place: session.place,
        firmCount: session.firmCount,
      })
      .then((res) => {
        toast.success("Изменения сохранены");
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  } else {
    await axiosInstance
      .post("session/createSessions", {
        dateStart: session.dateStart,
        dateEnd: session.dateEnd,
        place: session.place,
        firmCount: session.firmCount,
      })
      .then((res) => {
        toast.success("Сессия создана");
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  }
};
