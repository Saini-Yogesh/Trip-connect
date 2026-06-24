import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary, secondary, danger, glass, outline
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const buttonClass = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
