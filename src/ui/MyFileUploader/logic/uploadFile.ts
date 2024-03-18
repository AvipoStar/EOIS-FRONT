export const uploadFile = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8000/Documents/UserPhoto', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        return(data.filePath)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };