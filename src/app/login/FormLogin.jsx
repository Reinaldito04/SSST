"use client";
import clsx from "clsx";
import { useState, useCallback, Suspense } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import Image from "next/image";
import pdvsa from "../assets/pdvsa.png";
import loginBackground from "../assets/loginbackground.jpeg";
import styles from "./styles/login.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { axioInstance } from "../utils/axioInstance";
import { useUserStore } from "../store/userStore";

// Componente principal que envuelve el formulario en Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.loadingContainer}>Cargando formulario...</div>}>
      <FormLogin />
    </Suspense>
  );
}

// Componente del formulario de login
function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Obtener el tipo de usuario de los parámetros de búsqueda
  const type = searchParams.get("Type");
  const formattedType = type ? capitalizeFirstLetter(type) : null;

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validación de campos vacíos
    if (!username.trim() || !password.trim()) {
      setError("Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      // Llamada a la API de login
      const response = await axioInstance.post("/sanctum/login", {
        email: username.trim(),
        password: password.trim(),
      });

      if (response.data) {
        // Guardar datos en localStorage solo en el cliente
        if (typeof window !== "undefined") {
          localStorage.setItem("username", response.data.user.name);
          localStorage.setItem("token", response.data.token);
        }
        // Actualizar estado global del usuario
        setUser(response.data.user);
        // Redirigir al dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      let errorMessage = "Error en el login. Verifica tus credenciales";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [username, password, router, setUser]); // Dependencias del useCallback

  return (
    <div className={styles.mainContainer}>
      {/* Sección izquierda con imagen de fondo */}
      <div className={styles.bannerSection}>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.bannerContent}>
          <div className={styles.logoContainer}>
            <Image 
              src={pdvsa} 
              alt="Logo PDVSA" 
              width={280} 
              height={100}
              priority
              className={styles.logoImage}
            />
          </div>
          <div className={styles.bannerText}>
            <h2 className={styles.title}>SISTEMA INTEGRAL DE GESTIÓN</h2>
            <p className={styles.subtitle}>Plataforma de Gestión para Procesos de Automatización</p>
          </div>
        </div>
      </div>
      
      {/* Sección derecha con formulario */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.userIcon}>
            <CiUser size={48} className={styles.labelLogin} />
          </div>
          
          <h3 className={styles.welcomeText}>
            Bienvenido{formattedType ? `, ${formattedType}` : ""}
          </h3>
          <p className={styles.loginPrompt}>Por favor ingrese sus credenciales</p>
          
          {/* Mensaje de error */}
          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Campo de usuario */}
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.inputLabel}>
                <CiUser className={styles.inputIcon} />
                <span className={styles.labelLogin}>Usuario</span>
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                disabled={loading}
                className={styles.textInput}
              />
            </div>
            
            {/* Campo de contraseña */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                <CiLock className={styles.inputIcon} />
                <span className={styles.labelLogin}>Contraseña</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className={styles.textInput}
              />
            </div>
            
            {/* Botón de submit */}
            <button
              type="submit"
              disabled={loading}
              className={clsx(styles.buttonLogin, {
                [styles.buttonLoading]: loading,
              })}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Procesando...
                </>
              ) : "INICIAR SESIÓN"}
            </button>
          </form>
          
          {/* Enlaces de pie de página */}
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>¿Problemas para ingresar?</a>
            <span className={styles.linkSeparator}>|</span>
            <a href="#" className={styles.footerLink}>Contactar al administrador</a>
          </div>
        </div>
      </div>
    </div>
  );
}