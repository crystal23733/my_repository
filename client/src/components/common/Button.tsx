import React from "react";
import { ButtonProps } from "../../types/Button";

/**
 * 재사용 가능한 버튼 컴포넌트
 *
 * 이 컴포넌트는 다양한 용도로 사용할 수 있는 버튼을 제공합니다.
 * Bulma의 버튼 클래스를 활용하여 스타일을 지정합니다.
 *
 * @component
 *
 * @param {ButtonProps} props - 버튼 컴포넌트에 전달되는 속성
 * @returns {JSX.Element} 버튼 컴포넌트
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  /**
   * Bulma의 버튼 스타일 클래스 설정
   *
   * @param {"primary" | "secondary" | "danger" | "success"} variant - 버튼의 스타일 변형
   * @returns {string} Bulma 버튼 클래스
   */
  const getVariantClass = (
    variant: ButtonProps["variant"]
  ): string => {
    switch (variant) {
      case "primary":
        return "is-primary";
      case "secondary":
        return "is-link"; // Bulma에는 'is-secondary' 클래스가 없으므로 'is-link' 사용
      case "danger":
        return "is-danger";
      case "success":
        return "is-success";
      default:
        return "is-primary";
    }
  };

  const variantClass = getVariantClass(variant);

  return (
    <button
      className={`button ${variantClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;

