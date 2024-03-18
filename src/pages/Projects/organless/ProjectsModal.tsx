import React, { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { IProject } from "./ProjectsPage";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { useSelector } from "react-redux";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { setProject } from "../logic/setProject";

interface IProjectsModal {
  editedProject: IProject | null;
  setEditedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadProjects: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectsModal = (params: IProjectsModal) => {
  const directions = useSelector((state: any) => state.directions);
  const [editedProject, setEditedProject] = useState<IProject | null>(params.editedProject);

  const handleChange = (selectedOption: any, fieldName: string) => {
    setEditedProject((prev: any) => ({
      ...prev,
      [fieldName]: selectedOption.value ? selectedOption.value : selectedOption,
    }));
  };

  const saveProject = () => {
    if (editedProject) 
    {
      setProject(editedProject);
      params.setReloadProjects(true)
      params.setShow(false)
    }
  };

  return (
    <MyModal
      setShow={params.setShow}
      title={`${params.editedProject?.id ? "Редактирование" : "Создание"} проекта`}
      setEdited={params.setEditedProject}
      editOrSave={params.editedProject?.id ? "edit" : "save"}
      handleSave={saveProject}
    >
      <ContainerWithLabel title={"Направление"} darkTheme>
        <MySelect
          isMulti={false}
          options={directions}
          onChange={(e: any) => handleChange(e, "direction")}
          key="id"
          label="name"
          placeholder="Направление"
          defaultValues={directions
            .filter((e: any) => e.id === params.editedProject?.direction)
            .map((e: any) => ({ value: e.id, label: e.name }))}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Название"} darkTheme>
        <MyInput value={editedProject?.nameProject || ""} setValue={(e: any) => handleChange(e, "nameProject")} />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Описание"} darkTheme>
        <MyInput
          value={editedProject?.descriptionProject || ""}
          setValue={(e: any) => handleChange(e, "descriptionProject")}
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
