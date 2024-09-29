'use client';
import { useEffect, useState } from "react";
import Header from "./Header"; // Asegúrate de que esta ruta sea correcta
import Sidebar from "./Sidebar"; // Asegúrate de que esta ruta sea correcta
import clsx from "clsx";
import styles from "./styles/Layout.module.css";

function LayoutSidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Cargar el estado del sidebar desde localStorage
    const savedState = JSON.parse(localStorage.getItem('sidebarOpen'));
    if (savedState !== null) {
      setIsSidebarOpen(savedState);
    }
  }, []);

  useEffect(() => {
    // Guardar el estado en localStorage al cambiar
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={clsx(styles.layout, "d-flex flex-column")}>
      <Header toggleSidebar={toggleSidebar} />

      <div className="d-flex flex-grow-1">
        <Sidebar isOpen={isSidebarOpen} />

        <main className={clsx(styles.content, "p-4 flex-grow-1", {
          [styles.contentShifted]: !isSidebarOpen,
        })}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default LayoutSidebar;
