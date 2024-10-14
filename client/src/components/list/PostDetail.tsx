import React, { useState } from "react";
import useReadPostsFetch from "../../hook/useReadPostsFetch";
import FullscreenImage from "../common/FullscreenImage";

interface PostDetailProps {
  postId: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const { readDetail, error, loading } = useReadPostsFetch(postId);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!readDetail) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleImageClick = (index: number) => {
    setFullscreenIndex(index);
  };

  const handleCloseFullscreen = () => {
    setFullscreenIndex(null);
  };

  return (
    <div className="box mt-4">
      <h1 className="title">{readDetail.title}</h1>
      <p className="content">{readDetail.content}</p>
      {readDetail.images.map((image, index) => (
        <img
          key={index}
          src={`${image}`}
          alt={`이미지 ${index + 1}`}
          className="image mt-2"
          onClick={() => handleImageClick(index)}
        />
      ))}
      {fullscreenIndex !== null && (
        <FullscreenImage
          images={readDetail.images}
          initialIndex={fullscreenIndex}
          onClose={handleCloseFullscreen}
        />
      )}
    </div>
  );
};

export default PostDetail;
