import { axiosInstance } from "../../../Common/axios/axiosInstance";

export const setColumn = async (column: {
  name?: string;
  idBoard?: number;
  serialNumber: number;
}) => {
  const response = await axiosInstance.post("taskmanager/createColumn", {
    name: column.name,
    idBoard: column.idBoard,
    serialNumber: column.serialNumber,
  });
  return response.data;
};
