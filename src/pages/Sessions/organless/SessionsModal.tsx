import { useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { ISession } from "./SessionsPage";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { setSession } from "../logic/setSession";
import { MyMultyDatePiker } from "../../../ui/MyMultyDatePicker/organless/MyMultyDatePiker";

const firmsCountArray = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
];

interface ISessionsModal {
  editedSession: ISession | null;
  setEditedSession: React.Dispatch<React.SetStateAction<ISession>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadSession: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SessionsModal = (params: ISessionsModal) => {
  const [editedSession, setEditedSession] = useState<ISession | null>(
    params.editedSession
  );

  const handleChange = (selectedOption: any, fieldName: string) => {
    setEditedSession((prev: any) => ({
      ...prev,
      [fieldName]: selectedOption.value ? selectedOption.value : selectedOption,
    }));
  };

  const saveSession = () => {
    if (editedSession) {
      setSession(editedSession);
      params.setReloadSession(true);
      params.setShow(false);
    }
  };

  return (
    <MyModal
      setShow={params.setShow}
      title={`${
        params.editedSession?.id ? "Редактирование" : "Создание"
      } сессии`}
      setEdited={params.setEditedSession}
      editOrSave={params.editedSession?.id ? "edit" : "save"}
      handleSave={saveSession}
    >
      <ContainerWithLabel title={"Расположение"} darkTheme>
        <MyInput
          value={editedSession?.place}
          setValue={(e: any) => handleChange(e, "place")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Даты"} darkTheme>
        <MyMultyDatePiker
          dateStart={editedSession?.dateStart}
          dateEnd={editedSession?.dateEnd}
          setDates={(e: any) => handleChange(e, "dates")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Количество фирм"} darkTheme>
        <MySelect
          itemKey={"id"}
          isMulty={false}
          options={firmsCountArray}
          onChange={(e: any) => handleChange(e, "firmCount")}
          label={"name"}
          placeholder={"Количество фирм"}
          defaultValues={firmsCountArray
            .filter((fca: any) => fca.id == editedSession?.firmCount)
            .map((fca: any) => ({ value: fca.id, label: fca.name }))}
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
