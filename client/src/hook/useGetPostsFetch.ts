import { useEffect, useState } from "react";
import FetchApi from "../api/lib/FetchApi";

// 게시글 타입 정의
interface Post {
  id: string;
  title: string;
}

interface UseGetPostsFetchReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export default (): UseGetPostsFetchReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
      const TITLE_URL = process.env.NEXT_PUBLIC_TITLE_URL as string;
      const listApi = new FetchApi<Post[]>(BASE_URL);
      try {
        const data = await listApi.request(TITLE_URL, "GET");
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { posts, loading, error };
};
