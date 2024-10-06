/**
 * 버튼 컴포넌트의 속성을 정의하는 인터페이스
 * @property {string} label - 버튼에 표시될 텍스트
 * @property {() => void} onClick - 버튼 클릭 시 호출될 함수
 * @property {string} variant - 버튼 스타일
 * @property {boolean} disabled - 버튼의 비활성화 상태
 */
export default interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
}
