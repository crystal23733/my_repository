/**
 * 게시글 작성 폼의 데이터 구조를 정의하는 인터페이스
 * @property {string} title - 게시글 제목
 * @property {string} comment - 내용
 * @property {File | null} image - 업로드 할 이미지 파일
 */
export default interface createFormData {
  title: string;
  comment: string;
  image: File | null;
}
