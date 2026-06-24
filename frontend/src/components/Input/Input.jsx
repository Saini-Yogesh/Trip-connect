import React from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  id,
  type = "text",
  error,
  placeholder,
  value,
  onChange,
  options = [], // for type="select"
  required = false,
  className = "",
  rows = 4, // for type="textarea"
  ...props
}) => {
  const containerClass = `${styles.container} ${className}`;
  const inputClass = `${styles.input} ${error ? styles.inputError : ""}`;

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={id}
          className={inputClass}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
