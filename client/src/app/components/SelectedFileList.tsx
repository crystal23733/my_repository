import React from "react";

/**
 * 선택된 파일 리스트 컴포넌트의 속성 인터페이스
 */
interface SelectedFileListProps {
  files: File[];
}

/**
 * 선택된 파일 목록을 보여주는 컴포넌트
 *
 * @param {SelectedFileListProps} props - 선택된 파일 리스트 속성
 * @returns {JSX.Element} 파일 리스트를 표시하는 JSX 요소
 */
const SelectedFileList: React.FC<SelectedFileListProps> = ({ files }) => {
  return (
    <div>
      <h3>선택된 파일 목록</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedFileList;
