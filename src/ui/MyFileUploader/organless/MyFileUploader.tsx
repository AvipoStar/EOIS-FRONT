import React, { useEffect, useState } from "react";
import { uploadFile } from "../logic/uploadFile";

interface IFileUploader {
  onFileUploaded: (filePath: string) => void;
}

export const FileUploader = (params: IFileUploader) => {
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

  const fetchFilePath = async (file: any) => {
    const filePath = await uploadFile(selectedFile);
    if (filePath) params.onFileUploaded(filePath);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};
