"use client";

import React, { useState } from "react";
import CreatePostForm from "../components/CreatePost/CreatePostForm"; // 게시글 작성 폼 가져오기
import PostList from "../components/list/PostList";
import useModal from "../hook/useModal";

/**
 * 메인 페이지 컴포넌트
 *
 * 홈 페이지에서는 게시글 리스트와 글쓰기 버튼을 포함합니다.
 *
 * @component
 *
 * @returns {JSX.Element} 홈 페이지
 */
const HomePage: React.FC = () => {
  const { isActive, handleModal, closeModal } = useModal();

  return (
    <div className="container">
      <div className="create-box">
        <h1 className="title">내 블로그</h1>
        <button className="button is-primary" onClick={handleModal}>
          글쓰기
        </button>

        {/* 모달 컴포넌트 */}
        <CreatePostForm isActive={isActive} closeModal={closeModal} />
      </div>
      <div className="list-box">
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
