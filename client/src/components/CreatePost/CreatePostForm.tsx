"use client";

import React, { useState } from "react";
import Modal from "../common/Modal";
import IModalProps from "../../interface/modal.interface";
import useSubmitPost from "../../hook/useSubmitPost";

/**
 * 게시글 작성 폼 컴포넌트
 *
 * 이 컴포넌트는 사용자가 게시글을 작성할 수 있는 폼을 제공합니다.
 * 제목, 내용, 이미지 업로드 기능을 포함합니다.
 *
 * @component
 *
 * @param {IModalProps} props - 모달의 활성화 상태 및 모달 닫기 함수 포함
 * @returns {JSX.Element} 게시글 작성 폼
 */
const CreatePostForm: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const { handleSubmit, loading } = useSubmitPost();
  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages(Array.from(files)); // 선택된 파일을 배열로 변환
    } else {
      setImages([]); // 파일이 없을 경우 상태를 초기화
    }
  };

  console.log("제목:", title);
  console.log("내용:", content);
  console.log("이미지 수:", images.length);

  // 폼 제출 핸들러
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ title, content, images }, closeModal);
  };

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="게시글 작성"
      onConfirm={onSubmit}
      loadingStatus={loading}
    >
      <form onSubmit={onSubmit}>
        <div className="field">
          <label className="label">제목</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="게시글 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">내용</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="게시글 내용을 입력하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">이미지 업로드</label>
          <div className="control">
            <input
              className="input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostForm;
