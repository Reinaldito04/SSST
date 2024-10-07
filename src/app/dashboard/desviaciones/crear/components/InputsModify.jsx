'use client'
import React from "react";
import styles from "../styles/inputComponent.module.css";
import clsx from "clsx";

const InputComponent = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  options = [],
  styled = false,
  style = {},
  readOnly = false
}) => {
  return (
    <div
      className={clsx(
        styled ? styles.inputColumn : styles.inputWrapper,
        "col",
      )}
    >
      {styled ? (
        <label className={clsx(styles.inputLabel, styles.inputLabelColumn)}
        style={style}>
          {label}
        </label>
      ) : (
        <div className={styles.inputLabel}>{label}</div>
      )}
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className={clsx(styled ? styles.inputFieldStyled : styles.inputField)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={style}
          readOnly={readOnly}
          className={clsx(styled ? styles.inputFieldStyled : styles.inputField)}
        />
      )}
    </div>
  );
};

export default InputComponent;
