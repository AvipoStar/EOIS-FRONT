import { toast } from "react-toastify";
import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { IPayment } from "../organless/PaymentsPage";
import { useSelector } from "react-redux";

export const setEventForUser = async (payment: IPayment) => {
  console.log("payment 111", payment);
  try {
    await Promise.all(
      payment.targetUserIds.map(async (ui: any) => {
        const res = await axiosInstance.post("events/createEvent", {
          eventTypeId: payment.eventTypeId,
          targetUserId: ui,
          initiatorId: payment.initiatorId,
          datetimeEvent: payment.datetimeEvent ?? new Date(),
          amount: payment.amount,
          description: payment.description,
        });
        console.log("res", res);
        toast.success("Изменения сохранены");
      })
    );
  } catch (err: any) {
    toast.error(err.response?.data.detail);
  }
};
