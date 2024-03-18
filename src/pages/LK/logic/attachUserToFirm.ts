import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const attachUserToFirm = async (userId: number, firmId: number, profileId: number, projectId: number[]) => {
  const response = await axiosInstance.post("users/attachUserToFirm", {
    userId: userId,
    firmId: firmId,
    profileId: profileId,
    projectIds: projectId
  });
  return response.data;
};
