import { toast } from "react-toastify";
import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { IProject } from "../organless/ProjectsPage";

export const setProject = async (project: IProject) => {
  if (project.id) {
    await axiosInstance
      .put("projects/updateProject", {
        "id": project.id,
        nameProject: project.nameProject,
        descriptionProject: project.descriptionProject,
        direction: project.direction,
      })
      .then((res) => {
        console.log('res', res)
        toast.success("Изменения сохранены");
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  } else {
    await axiosInstance
      .post("projects/createProject", {
        // "id": project.id,
        nameProject: project.nameProject,
        descriptionProject: project.descriptionProject,
        direction: project.direction,
      })
      .then((res) => {
        console.log('res', res)
        toast.success("Проект сохранен");
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  }
};
