'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Importa useRouter para redirigir
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import clsx from "clsx";
import styles from "./styles/Layout.module.css";

function LayoutSidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();  // Inicializa useRouter

  // Verificación de la autenticación
  useEffect(() => {
    const username = localStorage.getItem('username');  // Obtiene el usuario del localStorage
    
    if (!username) {
      router.push('/');  // Si no hay usuario, redirige al home
    }
  }, [router]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('sidebarOpen'));
    if (savedState !== null) {
      setIsSidebarOpen(savedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={clsx(styles.layout, "d-flex flex-column min-vh-100")}>
      <Header toggleSidebar={toggleSidebar} />

      <div className="d-flex flex-grow-1">
        <Sidebar isOpen={isSidebarOpen} />

        <main className={clsx(styles.content, "flex-grow-1 scrollable-section", {
          [styles.contentShifted]: !isSidebarOpen,
        })}>
          {children}
        </main>
      </div>

      <Footer isOpen={isSidebarOpen} />
    </div>
  );
}

export default LayoutSidebar;
