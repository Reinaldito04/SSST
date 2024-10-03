import React from 'react';
import { CiCircleMinus } from "react-icons/ci";
import styles from './styles/Card.module.css';
import clsx from 'clsx';

function CardIncendio({ title, subtitle,colorLine,colorText }) {
  return (
    <div className={clsx(styles.card)}>
      <div className="d-flex align-items-center ">
        <div className={clsx(styles.line, "line me-3")}
        style={{
          backgroundColor: colorLine
        }}
        ></div> {/* Línea vertical */}
        <div className="flex-grow-1">
          <h5 className={clsx(styles.cardtitle, "card-title mb-0")} style={{ color: colorText }}>{title}</h5>
          <p className={clsx(styles.cardsubtitle, "card-subtitle  mb-0")}
          
          style={{
            color: colorText,
            textWrap:'balance'
          }}
          >{subtitle}</p>
        </div>
        <div className="me-2">
          <CiCircleMinus size={40} className="text-secondary" />
        </div>
      </div>
    </div>
  );
}

export default CardIncendio;
