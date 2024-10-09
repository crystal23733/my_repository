/**
 * @date 24.08.09
 * * API 요청을 처리하는 클래스
 */
export default class FetchApi<T> {
  private baseUrl: string;
  private defaultHeaders: object;
  private controller?: AbortController;

  /**
   * API 클라이언트 생성자 함수입니다.
   * @param {string} baseUrl - API의 기본 URL
   * @param {object} [defaultHeaders={}] - 기본 요청 헤더 (선택 사항)
   */
  constructor(
    baseUrl: string,
    defaultHeaders: object = { "Content-Type": "application/json" },
  ) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * AbortController를 이용하여 요청 취소 기능 추가
   * @private
   */
  private createAbortController() {
    this.controller = new AbortController();
  }

  /**
   * API 요청을 처리하는 메서드입니다.
   * @param {string} endpoint - API 요청 엔드포인트 (baseUrl 뒤에 붙습니다)
   * @param {string} method - HTTP 메서드 (GET, POST, etc.)
   * @param {object} [body] - 요청 본문 (선택 사항)
   * @param {object} [headers] - 추가 요청 헤더 (선택 사항)
   * @param {boolean} [credentials] - 쿠키 요청 여부 (선택 사항)
   * @returns {Promise<T>} - 서버의 응답 데이터
   * @throws {Error} - 응답이 성공적이지 않을 경우 에러를 발생시킴
   */
  async request(
    endpoint: string,
    method: string,
    body?: object | null,
    headers?: object | null,
    credentials?: boolean | null,
  ): Promise<T> {
    this.createAbortController(); // 요청마다 새로운 컨트롤러 생성

    try {
      const response = await fetch(this.baseUrl + endpoint, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : null,
        credentials: credentials ? "include" : "same-origin",
        signal: this.controller?.signal, // AbortController의 signal을 전달하여 요청 취소 가능
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "요청 실패");
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error; // 요청 취소 에러를 다시 throw하여 처리 흐름 유지
      } else {
        throw error; // 기타 에러 throw
      }
    }
  }

  /**
   * 요청 취소 메서드입니다.
   * 현재 진행 중인 API 요청을 취소합니다.
   */
  abortRequest() {
    if (this.controller) {
      this.controller.abort(); // 요청 취소
    }
  }
}
