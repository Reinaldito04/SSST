'use client'
import React, { useState,useEffect } from "react";
import styles from "./styles/Header.module.css";
import { FaBars, FaUserCircle } from "react-icons/fa";
import petropiar from "../assets/logopetropiar.JPG";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
function Header({ toggleSidebar }) {


  const [username, setUsername] = useState("Usuario");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Usamos useEffect para asegurarnos de que el código solo se ejecute en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <FaBars size={30} className={styles.barsIcon} />
        </div>
        <Link href="/dashboard">
        <div className={styles.logo} 
        >
          <Image src={petropiar} alt="Logo" width={200} height={50} />
        </div>
        </Link>
       
      </div>

      <div className={styles.userSection} onClick={toggleMenu}>
        <div className={styles.userInfo}>
          <FaUserCircle size={30} className={styles.userIcon} />
          <div className={styles.userName}>{username}</div>
          <IoIosArrowDown size={20} className={styles.iconArrow} />
        </div>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li>Perfil</li>
              <li>Configuraciones</li>
              <li>Cerrar sesión</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
