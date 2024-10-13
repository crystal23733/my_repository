import React from "react";

interface Post {
  id: string;
  title: string;
}

interface PostListProps {
  posts: Post[]; // 게시글 리스트를 props로 받음
}

/**
 * 게시글 리스트 컴포넌트
 * Bulma의 Panel 스타일을 활용해 게시글 제목을 나열
 *
 * @param {PostListProps} props - 게시글 리스트 데이터
 * @returns {JSX.Element} 게시글 리스트 UI
 */
const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <nav className="panel">
      <p className="panel-heading">게시글 목록</p>
      {posts.length === 0 ? (
        <div className="panel-block">게시글이 없습니다.</div>
      ) : (
        posts.map((post) => (
          <a key={post.id} className="panel-block">
            {post.title}
          </a>
        ))
      )}
    </nav>
  );
};

export default PostList;
