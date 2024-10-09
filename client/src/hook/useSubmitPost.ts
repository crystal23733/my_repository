import { useState } from "react";
import FetchApi from "@/api/lib/FetchApi";

interface SubmitPostProps {
  title: string;
  content: string;
  images: File[]; // 여러 이미지 배열
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const useSubmitPost = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    { title, content, images }: SubmitPostProps,
    closeModal: () => void,
  ): Promise<void> => {
    // 제목과 내용 검증
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // images가 정의되어 있는지 확인
    if (!images || !Array.isArray(images)) {
      alert("이미지 배열이 비어있습니다.");
      return;
    }

    // 이미지가 비어있지 않은지 확인 후 forEach 호출
    if (images.length === 0) {
      alert("최소 하나의 이미지를 업로드해야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 여러 이미지를 FormData에 추가
    images.forEach((image) => {
      formData.append("images", image); // 이미지 이름은 서버에서 처리할 수 있도록 "images"로 설정
    });

    try {
      setLoading(true);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
      const postEndpoint = process.env.NEXT_PUBLIC_POST_ENDPOINT as string;

      const api = new FetchApi<ApiResponse>(baseUrl);

      const response = await api.request(postEndpoint, "POST", formData, {
        "Content-Type": "multipart/form-data",
      });

      console.log("서버 응답:", response);
      alert("게시글이 성공적으로 등록되었습니다.");
      closeModal();
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default useSubmitPost;
