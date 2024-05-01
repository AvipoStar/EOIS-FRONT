import { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { useSelector } from "react-redux";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { attachUserToFirm } from "../logic/attachUserToFirm";
import { IProject } from "../../Projects/organless/ProjectsPage";
import { getProjects } from "../../Projects/logic/getProjects";

interface ILKAttachModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAttachData {
  firmId?: number;
  profileId?: number;
  projectIds?: number[];
}

export const LKAttachModal = (params: ILKAttachModal) => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const firmsOnCurrentSession = useSelector(
    (state: any) => state.firmsOnCurrentSession
  );
  const profiles = useSelector((state: any) => state.profiles);
  const [projects, setProjects] = useState<IProject[]>([]);

  const [attachData, setAttachData] = useState<IAttachData>();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const result = await getProjects([], "");
    if (result) setProjects(result);
  };

  const handleChangeAttachData = (value: any, field: string) => {
    if (Array.isArray(value)) {
      const buff: any[] = value.map((e) => e.value);
      setAttachData({ ...attachData, [field]: buff });
    } else setAttachData({ ...attachData, [field]: value });
  };

  const hendleAttachUserToFirm = () => {
    if (
      userInfo.id &&
      attachData?.firmId &&
      attachData?.profileId &&
      attachData?.projectIds
    )
      attachUserToFirm(
        userInfo.id,
        attachData.firmId,
        attachData.profileId,
        attachData.projectIds
      );
  };

  return (
    <MyModal
      setShow={params.setShowModal}
      title={"Редактирование профиля"}
      setEdited={setAttachData}
      editOrSave={"edit"}
      handleSave={hendleAttachUserToFirm}
    >
      <ContainerWithLabel title={"Фирма"} darkTheme>
        <MySelect
          itemKey={"id"}
          isMulty={false}
          options={firmsOnCurrentSession}
          onChange={(e: any) => handleChangeAttachData(e.value, "firmId")}
          label={"number"}
          placeholder={"Фирмы"}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Профиль"} darkTheme>
        <MySelect
          isMulty={false}
          options={profiles}
          onChange={(e: any) => handleChangeAttachData(e.value, "profileId")}
          itemKey="id"
          label="nameProfile"
          placeholder="Профиль"
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Проекты"} darkTheme>
        <MySelect
          isMulty={true}
          options={projects}
          onChange={(e: any) => handleChangeAttachData(e, "projectIds")}
          itemKey="id"
          label="nameProject"
          placeholder="Проекты"
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
