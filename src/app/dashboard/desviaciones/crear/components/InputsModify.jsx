import React from "react";
import styles from "../styles/inputComponent.module.css";

const InputComponent = ({ label, value, onChange, placeholder, type = "text", options = [] }) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputLabel}>
        {label}
      </div>
      {type === "select" ? (
        <select value={value} onChange={onChange} className={styles.inputField}>
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
          className={styles.inputField}
        />
      )}
    </div>
  );
};

export default InputComponent;
