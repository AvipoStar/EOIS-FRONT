import { baseURL } from "../Common/axios/axiosInstance";

export const getFile = async (linc: string) => {
  const files: any[] = [];
  const response = await fetch(`${baseURL}/${linc}`);
  if (response.status === 200) {
    const blob = await response.blob();
    const file = new File([blob], linc.slice(linc.lastIndexOf("/") + 1));

    Object.defineProperty(file, "name", {
      value: linc.slice(linc.lastIndexOf("/") + 1),
    });
    Object.defineProperty(file, "url", { value: linc });
    files.push(file);
  }
  console.log("files", files);
  return files;
};
