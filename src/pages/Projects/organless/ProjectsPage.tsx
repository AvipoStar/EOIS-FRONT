import { useEffect, useState } from "react";

import { Page } from "../../../ui/Page/organless/Page";
import { useSelector } from "react-redux";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { getProjects } from "../logic/getProjects";
import { InfoBlock } from "../../../ui/InfoBlock/organless/InfoBlock";
import { MyTable } from "../../../ui/MyTable/organless/MyTable";
import { ProjectsModal } from "./ProjectsModal";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { useDebounse } from "../../../Common/hooks/useDebounce";

export interface IProject {
  id: number;
  nameProject: string;
  descriptionProject: string;
  direction: string;
}

export const ProjectsPage = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const directions = useSelector((state: any) => state.directions);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDirections, setSelectedDirections] = useState<any | null>(
    null
  );
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [reloadProjects, setReloadProjects] = useState(false);
  const [searchString, setSearchString] = useState("");

  const debouncedValue = useDebounse(searchString);

  useEffect(() => {
    setSelectedDirections(directions.map((e: any) => e.id));
  }, [directions]);

  useEffect(() => {
    fetchProjects();
  }, [selectedDirections, debouncedValue]);

  useEffect(() => {
    if (reloadProjects) {
      fetchProjects();
      setReloadProjects(false);
    }
  }, [reloadProjects]);

  const handleDirectionsChange = (event: any) => {
    const values = event.map((e: any) => e.value);
    setSelectedDirections(values);
  };

  const fetchProjects = async () => {
    const dirIds =
      selectedDirections?.length > 0
        ? selectedDirections
        : directions.map((d: any) => d.id);
    const result = await getProjects(dirIds, debouncedValue);
    if (result) setProjects(result);
  };

  useEffect(() => {
    if (selectedProject) setShowCreateModal(true);
  }, [selectedProject]);

  return (
    <Page>
      {showCreateModal && (
        <ProjectsModal
          editedProject={selectedProject}
          setShow={setShowCreateModal}
          setEditedProject={setSelectedProject}
          setReloadProjects={setReloadProjects}
        />
      )}
      <FilterBlock
        showCreateButton={userInfo.roleId == 1}
        setShowCreateModal={() => setShowCreateModal(true)}
        buttonText="Новый проект"
      >
        <ContainerWithLabel title={"Поиск"}>
          <MyInput
            value={searchString}
            setValue={(e: any) => setSearchString(e)}
          />
        </ContainerWithLabel>
        <MySelect
          isMulty={true}
          options={directions}
          onChange={(e: any) => handleDirectionsChange(e)}
          itemKey="id"
          label="name"
          placeholder="Направления"
        />
      </FilterBlock>
      <InfoBlock title={"Проекты"}>
        <MyTable
          list={projects}
          onDoubleClick={(e: IProject) => setSelectedProject(e)}
          field="nameProject"
        />
      </InfoBlock>
    </Page>
  );
};
