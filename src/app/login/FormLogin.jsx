"use client";
import clsx from "clsx";
import { useState } from "react";
import React from "react";
import { CiUser } from "react-icons/ci";
import Image from "next/image";
import petropiar from "../assets/logopetropiar.JPG";
import styles from "./styles/login.module.css";
import { useSearchParams, useRouter } from "next/navigation"; // Asegúrate de importar useRouter
import { axioInstance } from "../utils/axioInstance";

function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const router = useRouter(); // Inicializa useRouter para redirigir después del login

  const LoginPost = async (username, password) => {
    try {
      setLoading(true);
      const response = await axioInstance.post("/users/login", {
        name: username,
        password: password,
      });
      return response.data;
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      
      // Verifica si hay un mensaje de error específico
      if (error.response && error.response.data && Array.isArray(error.response.data.detail)) {
        // Asumiendo que el mensaje de error está en el primer elemento del array
        const errorMessage = error.response.data.detail[0].msg;
        alert(" " + errorMessage);
      } else {
        alert("Error en el login: " + (error.response?.data?.detail || "Verifica tus credenciales"));
      }
    }

    setLoading(false);
  };
  

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const searchParams = useSearchParams();
  const type = searchParams.get("Type");
  const formattedType = type ? capitalizeFirstLetter(type) : null;

  return (
    <div>
      <div className={styles.logoContainer}>
        <Image src={petropiar} alt="Logo" width={330} height={110} />
      </div>
      <div
        className={clsx(
          styles.body,
          "container-fluid vh-100 d-flex align-items-center justify-content-center"
        )}
      >
        <div className="row w-100">
          <div className="col-md-6 d-flex flex-column justify-content-center text-center text-white fw-bolder p-4">
            <h2 className={clsx(styles.title, "fw-bolder")}>
              SISTEMA DE SEGURIDAD Y SALUD EN EL TRABAJO
            </h2>
          </div>
          <div
            className={clsx(
              styles.loginSection,
              "col-md-6 d-flex align-items-center justify-content-center"
            )}
          >
            <form className="w-75" onSubmit={(e) => {
              e.preventDefault();
              // Llama a LoginPost y redirige si es exitoso
              LoginPost(username, password).then((data) => {
                if (data) {
                   // Almacena el nombre de usuario y tipo en localStorage
                   localStorage.setItem('username', data.name); // Almacena el nombre de usuario
                   localStorage.setItem('typeUser', data.typeUser); // Almacena el tipo de usuario
                   
                   // Redirige a una página después del login
                   router.push('/dashboard');
                }
              });
            }}>
              <div className="contenedor-user text-center">
                <CiUser className={clsx(styles.labelLogin, "fs-1 ")} />
              </div>
              <h3 className="text-center mb-4">Bienvenido! {formattedType}</h3>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className={clsx(styles.labelLogin, "form-label ")}
                >
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)} // Corrige aquí el nombre de la función
                  value={username}
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className={clsx(styles.labelLogin, "form-label ")}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <div className="d-grid">
              <button
                  type="submit"
                  className={styles.buttonLogin}
                  disabled={loading} // Desactiva el botón mientras está cargando
                >
                  {loading ? "Cargando..." : "INGRESAR"}
                </button>
              </div>
              
              <p className="mt-3 text-muted">
                <a href="#" className="text-decoration-none text-black">
                  No tienes una cuenta aun?{" "}
                  <span className={styles.registerlabel}>Registrate</span>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
