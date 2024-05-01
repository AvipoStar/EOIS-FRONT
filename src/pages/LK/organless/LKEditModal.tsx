import { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { useSelector } from "react-redux";
import { changeUser } from "../logic/editProfile";
import { FileUploader } from "../../../ui/MyFileUploader/organless/MyFileUploader";
import { toast } from 'react-toastify';

interface ILKEditModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LKEditModal = (params: ILKEditModal) => {
  const userInfo = useSelector((state: any) => state.userInfo);

  const [newUserData, setnewUserData] = useState<any | null>(null);

  useEffect(() => {
    const lp = {
      login: userInfo.login,
      password: userInfo.password,
      photoPath: userInfo.photoPath,
    };
    setnewUserData(lp);
  }, [userInfo]);

  const saveUser = async () => {
    const result = await changeUser(
      userInfo.id,
      newUserData.login,
      newUserData.password,
      newUserData.photoPath
    );
    if(result)
      {
        params.setReloadPage(true)
        toast.success('Данные успешно изменены')
      }
  };
  return (
    <MyModal
      setShow={params.setShowModal}
      title={"Редактирование профиля"}
      setEdited={setnewUserData}
      editOrSave={"edit"}
      handleSave={saveUser}
    >
      <ContainerWithLabel title={"Логин"} darkTheme>
        <MyInput
          value={newUserData?.login}
          setValue={(e: any) =>
            setnewUserData({ ...newUserData, login: e })
          }
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Пароль"} darkTheme>
        <MyInput
          value={newUserData?.password}
          setValue={(e: any) =>
            setnewUserData({ ...newUserData, password: e })
          }
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Фото"} darkTheme>
        <FileUploader
          onFileUploaded={(e: any) =>
            setnewUserData({ ...newUserData, photoPath: e })
          }
          filePath={newUserData?.photoPath}
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
