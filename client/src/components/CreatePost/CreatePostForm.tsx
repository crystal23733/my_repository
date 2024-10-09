"use client";

import React, { useState } from "react";
import createFormData from "../../interface/createFormData.interface"; // 인터페이스 가져오기
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
  const [image, setImage] = useState<File | null>(null);

  const { handleSubmit, loading } = useSubmitPost();
  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    console.log(file);
  };

  // 폼 제출 핸들러
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ title, content, image }, closeModal);
  };

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="게시글 작성"
      onConfirm={handleSubmit}
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
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostForm;
