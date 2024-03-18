import React, { useState } from "react";
import { IUser } from "./LKPage";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { useSelector } from "react-redux";
import { changeLoginPassword } from "../logic/editProfile";

interface ILKEditModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LKEditModal = (params: ILKEditModal) => {
  const userInfo = useSelector((state: any) => state.userInfo);

  const [loginPassword, setloginPassword] = useState<{
    login: string;
    password: string;
  }>({ login: "", password: "" });

  const saveUser = async () => {
    await changeLoginPassword(
      userInfo.id,
      loginPassword.login,
      loginPassword.password
    );
  };
  return (
    <MyModal
      setShow={params.setShowModal}
      title={"Редактирование профиля"}
      setEdited={setloginPassword}
      editOrSave={"edit"}
      handleSave={saveUser}
    >
      <ContainerWithLabel title={"Новый логин"} darkTheme>
        <MyInput
          value={loginPassword?.login}
          setValue={(e: any) =>
            setloginPassword({ ...loginPassword, login: e })
          }
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Новый пароль"} darkTheme>
        <MyInput
          value={loginPassword?.password}
          setValue={(e: any) =>
            setloginPassword({ ...loginPassword, password: e })
          }
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
