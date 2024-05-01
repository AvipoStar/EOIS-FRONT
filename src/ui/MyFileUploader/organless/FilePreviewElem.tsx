import '../styles/FileUploader.css'
export const FilePreviewElem = ({ file }: { file: string }) => {
  return (
    <div className="file-preview-elem">
      <div className="img-container">
        <img src={file} />
      </div>
    </div>
  );
};
