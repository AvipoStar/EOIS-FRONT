import { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { useSelector } from "react-redux";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { MyDatePicker } from "../../../ui/MyDatePicker/organless/MyDatePicker";
import { IUser } from "../../LK/organless/LKPage";
import { IPayment } from "./PaymentsPage";
import { getStudentsInFirms } from "../logic/getStudentsInFirms";
import { setEventForUser } from "../logic/setEventForUser";

interface IPaymentsModal {
  selectedEvent: IPayment | null;
  setEditedPayment: React.Dispatch<React.SetStateAction<IPayment | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadPayments: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentsModal = (params: IPaymentsModal) => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const firmsOnCurrentSession = useSelector(
    (state: any) => state.firmsOnCurrentSession
  );
  const eventTypes = useSelector((state: any) => state.eventTypes);
  const [studentsInFirms, setstudentsInFirms] = useState<IUser[]>([]);
  const [convertedStudents, setConvertedStudents] = useState<any[]>([]);

  const [selectedFirm, setselectedFirm] = useState<number[]>();

  const [editedEvent, setEditedEvent] = useState<IPayment | null>(
    params.selectedEvent
  );

  useEffect(() => {
    if (selectedFirm) fetchStudentsInFirms(selectedFirm);
  }, [selectedFirm]);

  const fetchStudentsInFirms = async (firmIds: number[]) => {
    const students = await getStudentsInFirms(firmIds);
    if (students) setstudentsInFirms(students);
  };

  useEffect(() => {
    const convStuds: any[] = [];
    studentsInFirms.map((s) => {
      const newStud: any = s;
      newStud.fio = `${s.surname} ${s.name} ${s.patronymic}`;
      convStuds.push(s);
    });
    setConvertedStudents(convStuds);
  }, [studentsInFirms]);

  const handleChangeFirm = (selectedOption: any) => {
    const values = selectedOption.length
      ? selectedOption.map((e: any) => e.value)
      : selectedOption.value;
    setselectedFirm(values);
  };

  const handleChange = (event: any, field: string) => {
    let values: any;
    if (Array.isArray(event)) values = event?.map((e: any) => e.value);
    else if (typeof event == "object") values = event.value;
    else if (typeof event == "string") values = event;

    setEditedEvent((prevFilter: any) => {
      return {
        ...prevFilter,
        [field]: values,
      };
    });
  };

  const savePayment = async () => {
    if (editedEvent) {
      const fullEvent = editedEvent;
      fullEvent.initiatorId = userInfo.id;
      await setEventForUser(fullEvent);
    }
  };

  return (
    <MyModal
      setShow={params.setShow}
      title={`${
        params.selectedEvent?.id ? "Редактирование" : "Создание"
      } события`}
      setEdited={params.setEditedPayment}
      editOrSave={params.selectedEvent?.id ? "edit" : "save"}
      handleSave={savePayment}
    >
      <ContainerWithLabel title={"Фирмы"} darkTheme>
        <MySelect
          itemKey={"id"}
          isMulty={true}
          options={firmsOnCurrentSession}
          onChange={(e: any) => handleChangeFirm(e)}
          label={"number"}
          placeholder={"Фирмы"}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Участники"} darkTheme>
        <MySelect
          itemKey={"id"}
          isMulty={true}
          options={convertedStudents}
          onChange={(e: any) => handleChange(e, "targetUserIds")}
          label={"fio"}
          placeholder={"Участники"}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Тип"} darkTheme>
        <MySelect
          itemKey={"id"}
          isMulty={false}
          options={eventTypes}
          onChange={(e: any) => handleChange(e, "eventTypeId")}
          label={"nameEventType"}
          placeholder={"Тип"}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Количество"} darkTheme>
        <MyInput
          value={editedEvent?.amount}
          setValue={(e: any) => handleChange(e, "amount")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Дата и время"} darkTheme>
        <MyDatePicker
          initialDate={editedEvent?.datetimeEvent ?? ""}
          onDateChange={(e: any) => handleChange(e, "datetimeEvent")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Описание"} darkTheme>
        <MyInput
          value={editedEvent?.description}
          setValue={(e: any) => handleChange(e, "description")}
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
