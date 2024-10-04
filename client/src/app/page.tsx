"use client";
import Image from "next/image";
import styles from "./page.module.css";
import FileUpload from "./components/FileUpload";
import {useState} from "react";

/**
 * Home 컴포넌트
 *
 * @returns {JSX.Element} - 홈 페이지 컴포넌트
 */
export default function Home() {
  const [files, setFiles] = useState<{ id: number; filename: string }[]>([]);

  /**
   * 파일 업로드 핸들러
   * @param {string} title - 업로드할 폴더의 제목
   * @param {File[]} uploadedFiles - 업로드할 파일 목록
   */
  const handleFileUpload = (title: string, uploadedFiles: File[]) => {
    // 파일 업로드 로직 (API 호출 대신 여기서 임시로 처리)
    const newFiles = uploadedFiles.map((file) => ({
      id: Date.now(),
      filename: file.name,
    })); // 파일 아이디와 제목 저장 (임시)
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // 파일 리스트 업데이트
    console.log(files);
  };
  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
}
