"use client"

import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const CardModule = ({ icon, title, description, bgColor, textColor, href }) => {
  const router = useRouter();
  
  // Colores predeterminados si no se especifican
  const backgroundColor = bgColor || "bg-primary";
  const color = textColor || "text-white";

  const handleClick = () => {
    if (href) {
      router.push(href); // Navegación programática con useRouter
    }
  };

  return (
    <div 
      className={`card shadow-sm h-100 transition-all hover-effect ${backgroundColor} ${color}`}
      onClick={handleClick}
      style={{ cursor: href ? "pointer" : "default" }}
    >
      <div className="card-body text-center p-4">
        <div className="mb-3">
          {React.cloneElement(icon, {
            className: `display-4 ${icon.props.className || ""}`,
          })}
        </div>
        <h3 className="card-title h5 mb-2">{title}</h3>
        <p className="card-text small opacity-75">{description}</p>
      </div>
    </div>
  );
};

CardModule.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  href: PropTypes.string, // Añadido para la prop href
};

export default CardModule;