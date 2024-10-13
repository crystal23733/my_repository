"use client";

import React, {useState} from "react";
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
  
  // 더미데이터
  const [posts, setPosts] = useState<{id:string; title:string}[]>([
	  { id: "1", title: "첫 번째 게시글" },
    	  { id: "2", title: "두 번째 게시글" },
	  { id: "3", title: "세 번째 게시글" },
  ]);

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
      	<PostList posts={posts}/>
      </div>
    </div>
  );
};

export default HomePage;
