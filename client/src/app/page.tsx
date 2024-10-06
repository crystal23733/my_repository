"use client";

import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

/**
 * 홈 페이지 컴포넌트
 *
 * @returns {JSX.Element} 홈 페이지 JSX 요소
 */
export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<
    { id: number; filename: string }[]
  >([]); // 업로드된 파일 리스트 상태

  /**
   * 파일 업로드 핸들러
   * @param {string} title - 업로드할 폴더의 제목
   * @param {File[]} files - 업로드할 파일 목록
   */
  const handleFileUpload = (title: string, files: File[]) => {
    console.log("파일 업로드 핸들러 호출:", { title, files }); // 업로드 핸들러 호출 로그

    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(), // 고유한 ID 생성
      filename: file.webkitRelativePath, // 파일의 상대 경로를 저장
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]); // 파일 리스트 업데이트
  };

  return (
    <div>
      <h1>나의 소스코드 저장소</h1>
      <FileUpload onFileUpload={handleFileUpload} />{" "}
      {/* 파일 업로드 컴포넌트 사용 */}
      <FileList files={uploadedFiles} />{" "}
      {/* 업로드된 파일 목록 컴포넌트 사용 */}
    </div>
  );
}
