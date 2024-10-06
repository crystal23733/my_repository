"use client";

import React, { useState } from "react";
import createFormData from "../../interface/createFormData.interface"; // 인터페이스 가져오기
import Modal from "../common/Modal";
import IModalProps from "../../interface/modal.interface";

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

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    console.log(file);
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 제출 시 onSubmit 호출
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    // FormData의 내용을 콘솔에 출력
    console.log("폼 데이터:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // 폼 리셋
    setTitle("");
    setContent("");
    setImage(null);
    closeModal();
  };

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="게시글 작성"
      onConfirm={handleSubmit}
      loadingStatus={false}
    >
      <form onSubmit={handleSubmit}>
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
