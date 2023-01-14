import React from "react";
import "./Button.scss";

const variants = new Map([
  ["default", "default"],
  ["primary", "primary"],
  ["primary-empty", "primary-empty"],
  ["disabled", "disabled"],
  ["danger", "danger"],
  ["secondary", "secondary"],
  ["success", "success"],
  ["success-empty", "success-empty"],
]);

type VariantType =
  | "default"
  | "primary"
  | "disabled"
  | "danger"
  | "secondary"
  | "success"
  | "primary-empty"
  | "success-empty";

interface IProps {
  children: React.ReactNode;
  variant?: VariantType;
  onClick?: () => void;
  id?: string;
}

const Button: React.FC<IProps> = ({
  id,
  variant = "default",
  onClick,
  children,
}) => {
  return (
    <div className={"button-container"}>
      <button
        onClick={onClick}
        id={id}
        className={`button ${variants.get(variant)}`}
        disabled={variant === "disabled"}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
