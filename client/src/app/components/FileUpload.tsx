import React, { useState } from "react";

/**
 * 파일 업로드 컴포넌트의 속성 인터페이스
 * @property title - 업로드할 파일 제목
 * @property file - 업로드할 파일 목록
 */
interface FileUploadProps {
  onFileUpload: (title: string, file: File) => void;
}

/**
 * 폴더 단위의 파일 업로드 컴포넌트
 * @param {FileUploadProps} props - 파일 업로드 컴포넌트에 전달될 속성
 * @returns {JSX.Element} - 파일 업로드 컴포넌트
 */
const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  /**
   * 파일 선택시 상태 업데이트
   * @param {React.ChangeEvent<HTMLInputElement>} event - 파일 선택 이벤트
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  /**
   * 업로드 버튼 클릭 시 호출되는 함수
   */
  const handleUpload = () => {
    if (title && files.length > 0) {
      // 제목과 파일이 모두 입력되었을 때
      onFileUpload(title, files); // 콜백 호출
      setTitle(""); // 제목 초기화
      setFiles([]); // 파일 초기화
    } else {
      alert("제목과 파일을 모두 입력해 주세요.");
    }
  };
  return (
    <div>
      <form method="POST" className="field">
        <input
          className="input is-info"
          placeholder="제목을 입력해주세요."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input type="file" webkitdirectory="true" onChange={handleFileChange} required/>
        <input
          type="submit"
          value="업로드"
          className="button"
          onClick={handleUpload}
        />
      </form>
    </div>
  );
};

export default FileUpload;
