import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const getCurators = async (
  profiles: number[],
  searchString: string
) => {
  const response = await axiosInstance.post("users/getCuratorsByProfile", {
    profileIds: profiles,
    search: searchString,
  });
  return response.data.curators;
};
