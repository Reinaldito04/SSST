import React from "react";
import styles from "./styles/Header.module.css";
import { FaBars, FaUserCircle } from "react-icons/fa";
import petropiar from "../assets/logopetropiar.JPG";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <FaBars size={30} />
        </div>
        <div className={styles.logo}>
          <Image src={petropiar} alt="Logo" width={200} height={50} />
        </div>
      </div>

      <div className={styles.userSection}>
        <IoIosArrowDown size={20} className={styles.iconArrow} />
        <div className={styles.userName}>Reinaldo Bellorin</div>
        <FaUserCircle size={30} className={styles.userIcon} />
      </div>
    </header>
  );
}

export default Header;
