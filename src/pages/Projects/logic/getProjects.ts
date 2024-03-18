import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getProjects = async (
  directions: number[],
  searchString: string
) => {
  const response = await axiosInstance.post("projects/getProjectsByDirection", {
    directionIds: directions,
    search: searchString,
  });
  return response.data.projects;
};
