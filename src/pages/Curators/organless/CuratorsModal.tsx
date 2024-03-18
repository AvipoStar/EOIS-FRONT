import React, { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { useSelector } from "react-redux";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { MyRadioButton } from "../../../ui/MyRadioButton/organless/MyRadioButton";
import { MyDatePicker } from "../../../ui/MyDatePicker/organless/MyDatePicker";
import { setCurator } from "../logic/setCurator";
import { IUser } from "../../LK/organless/LKPage";

interface ICuratorsModal {
  editedCurator: IUser | null;
  setEditedCurator: React.Dispatch<React.SetStateAction<IUser | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadCurators: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CuratorsModal = (params: ICuratorsModal) => {
  const profiles = useSelector((state: any) => state.profiles);

  const [editedCurator, setEditedCurator] = useState<IUser | null>(
    params.editedCurator
  );

  useEffect(() => {
    console.log('editedCurator', editedCurator)
  }, [editedCurator]);

  const handleChange = (selectedOption: any, fieldName: string) => {
    setEditedCurator((prev: any) => ({
      ...prev,
      [fieldName]: selectedOption.value ? selectedOption.value : selectedOption,
    }));
  };

  const saveCurator = () => {
    if (editedCurator) {
      setCurator(editedCurator);
      params.setReloadCurators(true);
      params.setShow(false);
    }
  };

  return (
    <MyModal
      setShow={params.setShow}
      title={`${
        params.editedCurator?.id ? "Редактирование" : "Создание"
      } куратора`}
      setEdited={params.setEditedCurator}
      editOrSave={params.editedCurator?.id ? "edit" : "save"}
      handleSave={saveCurator}
    >
      <ContainerWithLabel title={"Фамилия"} darkTheme>
        <MyInput
          value={editedCurator?.surname || ""}
          setValue={(e: any) => handleChange(e, "surname")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Имя"} darkTheme>
        <MyInput
          value={editedCurator?.name || ""}
          setValue={(e: any) => handleChange(e, "name")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Отчество"} darkTheme>
        <MyInput
          value={editedCurator?.patronymic || ""}
          setValue={(e: any) => handleChange(e, "patronymic")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Дата рождения"} darkTheme>
        <MyDatePicker
          initialDate={editedCurator?.bornDate ?? ""}
          onDateChange={(e: any) => handleChange(e, "bornDate")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Пол"} darkTheme>
        <MyRadioButton
          options={[
            { id: 0, label: "Ж" },
            { id: 1, label: "М" },
          ]}
          editedObject={editedCurator?.gender}
          onChange={(e: any) => handleChange(e, "gender")} 
          darkTheme={true}        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Профиль"} darkTheme>
        <MySelect
          isMulti={false}
          options={profiles}
          onChange={(e: any) => handleChange(e, "profile")}
          key="id"
          label="nameProfile"
          placeholder="Профиль"
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
