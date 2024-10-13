import React, { useState } from "react";
import useGetPostsFetch from "../../hook/useGetPostsFetch";
import Link from "next/link";
import PostDetail from './PostDetail';

/**
 * 게시글 리스트 컴포넌트
 * Bulma의 Panel 스타일을 활용해 게시글 제목을 나열
 *
 * @param {PostListProps} props - 게시글 리스트 데이터
 * @returns {JSX.Element} 게시글 리스트 UI
 */
const PostList: React.FC = () => {
  const { posts, loading, error } = useGetPostsFetch();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  if (loading) return <div>...로딩중</div>;
  if (error) return <div>에러:{error}</div>;

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  return (
    <div className="container">
      <nav className="panel">
        <p className="panel-heading">게시글 목록</p>
        {posts.length === 0 ? (
          <div className="panel-block">게시글이 없습니다.</div>
        ) : (
          posts.map((post) => (
            <a
              href="#"
              key={post.id}
              className={`panel-block ${post.id === selectedPostId ? "is-active" : ""}`}
              onClick={() => handlePostClick(post.id)}
            >
              {post.title}
            </a>
          ))
        )}
      </nav>
      {selectedPostId && <PostDetail postId={selectedPostId} />}
    </div>
  );
};

export default PostList;
