import axios from 'axios';
import { baseURL } from "../../../Common/axios/axiosInstance";

export const uploadFile = async (file: any) => {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`${baseURL}files/uploadUserPhoto`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        return response.data.filePath; // Возвращаем путь к загруженному файлу
      } else {
        console.error('Server error:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }
  return null;
};