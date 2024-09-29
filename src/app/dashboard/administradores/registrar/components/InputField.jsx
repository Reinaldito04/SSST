import clsx from 'clsx';
import React from 'react';
import styles from '../styles/InputField.module.css';

function InputField({ label, type, placeholder, options, value, onChange,requiredColor = 'red' }) {
  return (
    <div className="mb-3">
      <label className={clsx(styles.formLabel, "form-label")}>
        {label}
        
          <span style={{ color: requiredColor }}> (*)</span> 
        
      </label>
      {type === 'select' ? (
        <select
          className={clsx(styles.formInput, "form-select")}
          value={value}
          onChange={onChange}
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
          className={clsx(styles.formInput, "form-control")}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-describedby={`${label}-description`} // Accesibilidad
        />
      )}
    </div>
  );
}

export default InputField;
