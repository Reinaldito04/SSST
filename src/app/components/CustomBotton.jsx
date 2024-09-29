import React from 'react';
import clsx from 'clsx';
import styles from './styles/CustomButton.module.css'; // Asegúrate de crear este archivo CSS

function CustomButton({ 
  backgroundColor = '#007bff', 
  textColor = '#ffffff', 
  label, 
  onClick, 
  style = {}, 
  className = '', 
  ...props 
}) {
  const buttonStyles = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <button
      onClick={onClick}
      style={{ ...buttonStyles, ...style }}
      className={clsx(styles.customButton, className)}
      {...props}
    >
      {label}
    </button>
  );
}

export default CustomButton;
