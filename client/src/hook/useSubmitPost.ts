import { useState } from "react";
import FetchApi from "@/api/lib/FetchApi";

interface SubmitPostProps {
  title: string;
  content: string;
  image: File | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * 게시글을 서버로 제출하는 커스텀 훅
 *
 * @returns {Function} handleSubmit 함수
 */
export default () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    { title, content, image }: SubmitPostProps,
    closeModal: () => void,
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const api = new FetchApi<ApiResponse>("/api/posts");
      const response = await api.request("", "POST", formData, {
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
