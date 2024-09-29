"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./styles/Sidebar.module.css";
import { FaList } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { FaUserTimes } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { IoGitBranchOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Sidebar({ isOpen }) {
  const [isOpenMenu1, setIsOpenMenu1] = useState(false);
  const [isOpenMenu2, setIsOpenMenu2] = useState(false);
  const [isOpenMenu3, setIsOpenMenu3] = useState(false);
  const [isOpenMenu4, setIsOpenMenu4] = useState(false);
  const [isOpenMenu5, setIsOpenMenu5] = useState(false);
  const [isOpenMenu6, setIsOpenMenu6] = useState(false);

  useEffect(() => {
    // Cargar el estado del sidebar desde localStorage
    const savedState = JSON.parse(localStorage.getItem("sidebarState"));
    if (savedState) {
      setIsOpenMenu1(savedState.isOpenMenu1);
      setIsOpenMenu2(savedState.isOpenMenu2);
      setIsOpenMenu3(savedState.isOpenMenu3);
      setIsOpenMenu4(savedState.isOpenMenu4);
      setIsOpenMenu5(savedState.isOpenMenu5);
      setIsOpenMenu6(savedState.isOpenMenu6);
    }
  }, []);

  useEffect(() => {
    // Guardar el estado en localStorage al cambiar
    const sidebarState = {
      isOpenMenu1,
      isOpenMenu2,
      isOpenMenu3,
      isOpenMenu4,
      isOpenMenu5,
      isOpenMenu6,
    };
    localStorage.setItem("sidebarState", JSON.stringify(sidebarState));
  }, [
    isOpenMenu1,
    isOpenMenu2,
    isOpenMenu3,
    isOpenMenu4,
    isOpenMenu5,
    isOpenMenu6,
  ]);

  const toggleMenu1 = () => setIsOpenMenu1(!isOpenMenu1);
  const toggleMenu2 = () => setIsOpenMenu2(!isOpenMenu2);
  const toggleMenu3 = () => setIsOpenMenu3(!isOpenMenu3);
  const toggleMenu4 = () => setIsOpenMenu4(!isOpenMenu4);
  const toggleMenu5 = () => setIsOpenMenu5(!isOpenMenu5);
  const toggleMenu6 = () => setIsOpenMenu6(!isOpenMenu6);

  return (
    <div className={clsx(styles.sidebar, { [styles.open]: isOpen })}>
      <ul className="nav flex-column">
        <li className={clsx(styles.navLink, "nav-item")}>
          <div
            className="nav-link text-black d-flex justify-content-between align-items-center"
            onClick={toggleMenu1}
            style={{ cursor: "pointer" }}
          >
            <FaUserTimes size={25} /> Administradores
            <span>{isOpenMenu1 ? "▼" : "►"}</span>
          </div>
          <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu1 })}>
            <li className="nav-item mb-2">
              <Link
                href="/dashboard/administradores/registrar"
                className="nav-link text-black"
              >
                Registrar Admin
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                href="/dashboard/administradores/consultar"
                className="nav-link text-black"
              >
                Gestionar Admin
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                href="/dashboard/administradores/consultar"
                className="nav-link text-black"
              >
                Consultar Admin
              </Link>
            </li>
          </ul>
        </li>

        <li className={clsx(styles.navLink, "nav-item")}>
          <div
            className="nav-link text-black d-flex justify-content-between align-items-center"
            onClick={toggleMenu2}
            style={{ cursor: "pointer" }}
          >
            <FaUserCheck size={25} /> Usuarios
            <span>{isOpenMenu2 ? "▼" : "►"}</span>
          </div>
          <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu2 })}>
            <li className="nav-item mb-2">
              <Link href="/subpage3" className="nav-link text-black">
                Submenú 2.1
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage4" className="nav-link text-black">
                Submenú 2.2
              </Link>
            </li>
          </ul>
        </li>

        <li className={clsx(styles.navLink, "nav-item")}>
          <div
            className="nav-link text-black d-flex justify-content-between align-items-center"
            onClick={toggleMenu3}
            style={{ cursor: "pointer" }}
          >
            <FaList size={25} /> Inspecciones
            <span>{isOpenMenu3 ? "▼" : "►"}</span>
          </div>
          <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu3 })}>
            <li className="nav-item mb-2">
              <Link href="/subpage5" className="nav-link text-black">
                Cronograma
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage6" className="nav-link text-black">
                SOL{" "}
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage6" className="nav-link text-black">
              Sistemas contra Incendio
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage6" className="nav-link text-black">
              Higiene ocupacional              </Link>
            </li>
          </ul>
        </li>

        <li className={clsx(styles.navLink, "nav-item")}>
          <div
            className="nav-link text-black d-flex justify-content-between align-items-center"
            onClick={toggleMenu4}
            style={{ cursor: "pointer" }}
          >
            <IoMdCheckmarkCircleOutline size={25} /> Formaciones
            <span>{isOpenMenu4 ? "▼" : "►"}</span>
          </div>
          <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu4 })}>
            <li className="nav-item mb-2">
              <Link href="/subpage7" className="nav-link text-black">
                Capacitación
              </Link>
            </li>
          </ul>
        </li>

        <li className={clsx(styles.navLink, "nav-item")}>
          <div
            className="nav-link text-black d-flex justify-content-between align-items-center"
            onClick={toggleMenu5}
            style={{ cursor: "pointer" }}
          >
            <FiHome size={25} /> Contratistas
            <span>{isOpenMenu5 ? "▼" : "►"}</span>
          </div>
          <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu5 })}>
            <li className="nav-item mb-2">
              <Link href="/subpage9" className="nav-link text-black">
                Registrar Contratista
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage10" className="nav-link text-black">
                Gestionar Contratista
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage10" className="nav-link text-black">
                Consultar Contratista
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage10" className="nav-link text-black">
                Control y Seguimiento
              </Link>
            </li>
          </ul>
        </li>

        <li className={clsx(styles.navLink, "nav-item")}>
          <div
            className="nav-link text-black d-flex justify-content-between align-items-center"
            onClick={toggleMenu6}
            style={{ cursor: "pointer" }}
          >
            <IoGitBranchOutline size={25} /> Desviaciones
            <span>{isOpenMenu6 ? "▼" : "►"}</span>
          </div>
          <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu6 })}>
            <li className="nav-item mb-2">
              <Link href="/subpage11" className="nav-link text-black">
                Registrar Desviaciones
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage12" className="nav-link text-black">
                Consultar Desviaciones
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href="/subpage12" className="nav-link text-black">
                Estadistica Desviaciones
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
