import React from 'react';
import useReadPostsFetch from '../../hook/useReadPostsFetch';

interface PostDetailProps {
  postId: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const { readDetail, error, loading } = useReadPostsFetch(postId);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!readDetail) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="box mt-4">
      <h1 className="title">{readDetail.title}</h1>
      <p className="content">{readDetail.content}</p>
      {readDetail.images.map((image, index) => (
        <img key={index} src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`} alt={`Image ${index + 1}`} className="image mt-2" />
      ))}
    </div>
  );
};

export default PostDetail;
