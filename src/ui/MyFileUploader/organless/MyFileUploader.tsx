import React, { useEffect, useState } from "react";
import { uploadFile } from "../logic/uploadFile";
import { baseURL } from "../../../Common/axios/axiosInstance";
import '../styles/FileUploader.css';
import { FilePreviewElem } from "./FilePreviewElem";

interface IFileUploader {
  filePath: string;
  onFileUploaded: (filePath: string) => void;
}

export const FileUploader: React.FC<IFileUploader> = (params) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (selectedFile) fetchFilePath(selectedFile);
  }, [selectedFile]);

  const fetchFilePath = async (file: File) => {
    const filePath = await uploadFile(file);
    if (filePath) params.onFileUploaded(filePath);
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} className="fileInput" />
      <FilePreviewElem key={params.filePath} file={baseURL + params.filePath} />
    </>
  );
};