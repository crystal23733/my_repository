import { useState, useEffect } from "react";
import FetchApi from "../api/lib/FetchApi";

interface ReadDetail {
  id: string;
  title: string;
  content: string;
  images: string[];
}

interface UseReadPostsDetailReturn {
  readDetail: ReadDetail | null;
  error: string | null;
  loading: boolean;
}

export default (postId: string): UseReadPostsDetailReturn => {
  const [readDetail, setReadDetail] = useState<ReadDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
      const fetchApi = new FetchApi<ReadDetail>(BASE_URL);
      const POST_URL = process.env.NEXT_PUBLIC_POST_ENDPOINT as string;
      const endpoint = `${POST_URL}/${postId}`;
      try {
        const data = await fetchApi.request(endpoint, "GET");
        setReadDetail(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (postId) {
      fetchData();
    }
  }, [postId]);
  return { readDetail, error, loading };
};
