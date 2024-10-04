import React, { useState } from "react";
import SelectedFileList from "./SelectedFileList";
import fetchGitignore from "../utils/fetchGitignore";

/**
 * 파일 업로드 컴포넌트의 속성 인터페이스
 */
interface FileUploadProps {
  onFileUpload: (title: string, files: File[]) => void;
}

/**
 * 폴더 단위의 파일 업로드 컴포넌트
 *
 * @param {FileUploadProps} props - 파일 업로드 컴포넌트에 전달되는 속성
 * @returns {JSX.Element} 파일 업로드를 위한 JSX 요소
 */
const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [title, setTitle] = useState<string>(""); // 제목 상태
  const [files, setFiles] = useState<File[]>([]); // 파일 상태

  /**
   * 파일 선택 시 상태 업데이트
   * @param {React.ChangeEvent<HTMLInputElement>} event - 파일 선택 이벤트
   */
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);

    // 파일이 선택되지 않은 경우
    if (selectedFiles.length === 0) return;

    console.log("선택된 파일:", selectedFiles); // 선택된 파일 목록 콘솔에 출력

    // 첫 번째 파일의 상대 경로를 가져옴
    const relativePath = selectedFiles[0].webkitRelativePath.split("/")[0]; // 선택한 폴더의 이름
    const gitignorePath = `/${relativePath}/.gitignore`; // .gitignore 경로 동적으로 생성

    // 동적으로 생성된 gitignorePath를 사용하여 제외할 목록 가져오기
    try {
      const excludedList = await fetchGitignore(gitignorePath); // 여기에서 await을 사용할 수 있도록
      console.log("제외할 파일 목록:", excludedList); // 제외할 파일 목록 콘솔에 출력

      // 제외 목록을 사용하여 파일 필터링
      const filteredFiles = selectedFiles.filter(
        (file) =>
          !excludedList.some((excluded) =>
            file.webkitRelativePath.includes(excluded),
          ),
      );

      console.log("필터링된 파일 목록:", filteredFiles); // 필터링된 파일 목록 콘솔에 출력
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Gitignore 파일 로드 중 오류 발생:", error);
    }
  };

  /**
   * 업로드 버튼 클릭 시 호출되는 함수
   */
  const handleUpload = () => {
    if (title && files.length > 0) {
      console.log("업로드할 제목:", title); // 업로드할 제목 콘솔에 출력
      console.log("업로드할 파일 목록:", files); // 업로드할 파일 목록 콘솔에 출력
      onFileUpload(title, files);
      setTitle("");
      setFiles([]);
    } else {
      alert("제목과 파일을 모두 입력해 주세요.");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="input"
        placeholder="폴더 제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // 제목 입력
      />
      <input
        type="file"
        webkitdirectory="true" // 디렉토리 선택 가능
        onChange={handleFileChange} // 파일 선택
      />
      <SelectedFileList files={files} /> {/* 선택된 파일 목록 표시 */}
      <button className="button" onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default FileUpload;
