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
import HasPermission from "./HasPermission";

function Sidebar({ isOpen }) {
  // Estados para los menús principales
  const [isOpenMenu1, setIsOpenMenu1] = useState(false);
  const [isOpenMenu2, setIsOpenMenu2] = useState(false);
  const [isOpenMenu3, setIsOpenMenu3] = useState(false);
  const [isOpenMenu4, setIsOpenMenu4] = useState(false);
  // Estados para los submenús de Areas
  const [isOpenMenu5, setIsOpenMenu5] = useState(false);
  const [isOpenPlants, setIsOpenPlants] = useState(false);
  const [isOpenSectors, setIsOpenSectors] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Obtener tipo de usuario desde localStorage
    const storedUserType = localStorage.getItem("typeUser");
    if (storedUserType) {
      setUserType(storedUserType);
    }

    // Cargar el estado del sidebar desde localStorage
    const savedState = JSON.parse(localStorage.getItem("sidebarState"));
    if (savedState) {
      setIsOpenMenu1(savedState.isOpenMenu1);
      setIsOpenMenu2(savedState.isOpenMenu2);
      setIsOpenMenu3(savedState.isOpenMenu3);
      setIsOpenMenu4(savedState.isOpenMenu4);
      setIsOpenMenu5(savedState.isOpenMenu5);
      setIsOpenPlants(savedState.isOpenPlants);
      setIsOpenSectors(savedState.isOpenSectors);
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
      isOpenPlants,
      isOpenSectors,
    };
    localStorage.setItem("sidebarState", JSON.stringify(sidebarState));
  }, [
    isOpenMenu1,
    isOpenMenu2,
    isOpenMenu3,
    isOpenMenu4,
    isOpenMenu5,
    isOpenPlants,
    isOpenSectors,
  ]);

  const toggleMenu1 = () => setIsOpenMenu1(!isOpenMenu1);
  const toggleMenu2 = () => setIsOpenMenu2(!isOpenMenu2);
  const toggleMenu3 = () => setIsOpenMenu3(!isOpenMenu3);
  const toggleMenu4 = () => setIsOpenMenu4(!isOpenMenu4);
  const toggleMenu5 = () => setIsOpenMenu5(!isOpenMenu5);
  const togglePlants = () => setIsOpenPlants(!isOpenPlants);
  const toggleSectors = () => setIsOpenSectors(!isOpenSectors);

  return (
    <div
      className={clsx(styles.sidebar, "scrollable-sectionNavbar", {
        [styles.open]: isOpen,
      })}
    >
      <ul className={clsx(styles.sidebarMenu, "nav flex-column")}>
        {/* Renderizar solo si el usuario es "admin" */}
        <HasPermission permissionName={"users-browse"}>
          <li className={clsx(styles.navLink, "nav-item")}>
            <div
              className="nav-link text-black d-flex justify-content-between align-items-center"
              onClick={toggleMenu1}
              style={{ cursor: "pointer" }}
            >
              <FaUserTimes size={25} /> Administradores
              <span>{isOpenMenu1 ? "▼" : "►"}</span>
            </div>
            <ul
              className={clsx(styles.submenu, { [styles.open]: isOpenMenu1 })}
            >
              <HasPermission permissionName={"users-add"}>
                <li className="nav-item mb-2">
                  <Link
                    href="/dashboard/administradores/registrar"
                    className="nav-link text-black"
                  >
                    Registrar User
                  </Link>
                </li>
              </HasPermission>

              <HasPermission permissionName={"users-read"}>
                <li className="nav-item mb-2">
                  <Link
                    href="/dashboard/administradores/consultar"
                    className="nav-link text-black"
                  >
                    Consultar Users
                  </Link>
                </li>
              </HasPermission>
            </ul>
          </li>
        </HasPermission>

        <HasPermission permissionName={"departments-browse"}>
          <li className={clsx(styles.navLink, "nav-item")}>
            <div
              className="nav-link text-black d-flex justify-content-between align-items-center"
              onClick={toggleMenu4}
              style={{ cursor: "pointer" }}
            >
              <IoMdCheckmarkCircleOutline size={25} /> Departamentos
              <span>{isOpenMenu4 ? "▼" : "►"}</span>
            </div>
            <ul
              className={clsx(styles.submenu, { [styles.open]: isOpenMenu4 })}
            >
              <HasPermission permissionName={"departments-add"}>
                <li className="nav-item mb-2">
                  <Link
                    href="/dashboard/departamentos/registrar"
                    className="nav-link text-black"
                  >
                    Registrar
                  </Link>
                </li>
              </HasPermission>

              <HasPermission permissionName={"departments-read"}>
                <li className="nav-item mb-2">
                  <Link
                    href="/dashboard/departamentos/consultar"
                    className="nav-link text-black"
                  >
                    Consultar
                  </Link>
                </li>
              </HasPermission>
            </ul>
          </li>
        </HasPermission>

        <HasPermission permissionName={"areas-browse"}>
          <li className={clsx(styles.navLink, "nav-item")}>
            <div
              className="nav-link text-black d-flex justify-content-between align-items-center"
              onClick={toggleMenu5}
              style={{ cursor: "pointer" }}
            >
              <FiHome size={25} /> Areas
              <span>{isOpenMenu5 ? "▼" : "►"}</span>
            </div>
            <ul className={clsx(styles.submenu, { [styles.open]: isOpenMenu5 })}>
              <li className="nav-item mb-2">
                <Link
                  href="/dashboard/areas/registrar"
                  className="nav-link text-black"
                >
                  Registrar Area
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  href="/dashboard/areas/consultar"
                  className="nav-link text-black"
                >
                  Consultar Areas
                </Link>
              </li>
              
              {/* Submenú para Plantas */}
              <li className="nav-item mb-2">
                <div
                  className="nav-link text-black d-flex justify-content-between align-items-center"
                  onClick={togglePlants}
                  style={{ cursor: "pointer" }}
                >
                  <FiHome size={20} /> Plantas
                  <span>{isOpenPlants ? "▼" : "►"}</span>
                </div>
                <ul className={clsx(styles.submenu, { [styles.open]: isOpenPlants })}>
                  <li className="nav-item mb-2 ps-3">
                    <Link href="/dashboard/areas/plantas/registrar" className="nav-link text-black">
                      Registrar Planta
                    </Link>
                  </li>
                  <li className="nav-item mb-2 ps-3">
                    <Link href="/dashboard/areas/plantas/consultar" className="nav-link text-black">
                      Consultar Plantas
                    </Link>
                  </li>
                </ul>
              </li>
              
              {/* Submenú para Sectores */}
              <li className="nav-item mb-2">
                <div
                  className="nav-link text-black d-flex justify-content-between align-items-center"
                  onClick={toggleSectors}
                  style={{ cursor: "pointer" }}
                >
                  <FiHome size={20} /> Sectores
                  <span>{isOpenSectors ? "▼" : "►"}</span>
                </div>
                <ul className={clsx(styles.submenu, { [styles.open]: isOpenSectors })}>
                  <li className="nav-item mb-2 ps-3">
                    <Link href="/dashboard/areas/plantas/sectores/registrar" className="nav-link text-black">
                      Registrar Sector
                    </Link>
                  </li>
                  <li className="nav-item mb-2 ps-3">
                    <Link href="/dashboard/areas/plantas/sectores/consultar" className="nav-link text-black">
                      Consultar Sectores
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </HasPermission>
      </ul>
    </div>
  );
}

export default Sidebar;