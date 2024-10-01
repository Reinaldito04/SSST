import React, { useState } from "react";
import styles from "../styles/CustomSelectComponent.module.css";

const CustomSelectComponent = ({ label, value, onChange, placeholder, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const getOptionClass = (optionValue) => {
    if (optionValue === "Bajo") return styles.bajo;
    if (optionValue === "Medio") return styles.medio;
    if (optionValue === "Alto") return styles.alto;
    return "";
  };

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectLabel}>{label}</div>
      <div className={styles.customSelect} onClick={handleSelectClick}>
        <div className={styles.selectedValue}>
          {value || placeholder}
        </div>
        {isOpen && (
          <div className={styles.optionsList}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.optionItem} ${getOptionClass(option.value)}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelectComponent;
