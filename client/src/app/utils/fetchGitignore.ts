import FetchApi from "../api/lib/FetchApi";

/**
 * .gitignore의 내용을 가져오는 함수
 * @param {string} baseUrl - .gitignore 파일의 경로
 * @returns {Promise<string[]>} - 제외할 파일 목록의 배열
 */
export default async (baseUrl: string): Promise<string[]> => {
  const apiClient = new FetchApi<string[]>(baseUrl);
  try {
    const gitignoreContent = await apiClient.request(".gitignore", "GET"); // ignore파일 요청
    return gitignoreContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
  } catch (error) {
    console.error("Failed to load .gitignore file:", error);
    return [];
  }
};
