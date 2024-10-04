import React from "react";

interface FileUploadProps {
  onFileUpload: (title: string, file: File) => void;
}

const FileUpload: React.FC = () => {

  return (
    <div>
      <form method="POST">
        <input placeholder="제목을 입력해주세요." type="text" />
      </form>
    </div>
  );
};

export default FileUpload;
