"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

import createFormData from "../../interface/createPostFormData";

/**
 * 게시글 작성 폼 컴포넌트
 *
 * 이 컴포넌트는 사용자가 게시글을 작성할 수 있는 폼을 제공합니다.
 * 제목, 내용, 이미지 업로드 기능을 포함합니다.
 *
 * @component
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {function(CreatePostFormData): void} props.onSubmit - 폼 제출 시 호출될 함수
 *
 * @returns {JSX.Element} 게시글 작성 폼
 */
interface CreatePostFormProps {
  /**
   * 게시글 작성 폼 제출 시 호출될 함수
   * @param {CreatePostFormData} data - 제출된 폼 데이터
   */
  onSubmit: (data: CreatePostFormData) => void;
}
const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<createFormData>({
    title: "",
    comment: "",
    image: null,
  });

  // 입력필드 변경 시 상태 업데이트
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 이미지 파일 선택 시 상태 업데이트
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData) => ({ ...prevData, image: e.target.files![0] }));
    }
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="title">
          제목
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="제목을 입력하세요"
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="content">
          내용
        </label>
        <div className="control">
          <textarea
            className="textarea"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="image">
          이미지 업로드
        </label>
        <div className="control">
          <input
            className="input"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-primary">
            제출
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
