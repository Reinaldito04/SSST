import clsx from "clsx";
import styles from "./styles/login.module.css";
import { CiUser } from "react-icons/ci";
import Image from "next/image"; // Si estás usando Next.js para optimizar imágenes
import petropiar from '../assets/logopetropiar.JPG'
import { metadata } from "../layout";
metadata.title = 'Login'
function LoginPage() {
  return (
    <>
     <div className={styles.logoContainer}>
        <Image src={petropiar} alt="Logo" width={330} height={110} />
      </div>
    <div className={clsx(styles.body, "container-fluid vh-100 d-flex align-items-center justify-content-center")}>
      {/* Imagen en la esquina superior izquierda */}
     

      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center text-center text-white fw-bolder p-4">
          <h2 className={clsx(styles.title, "fw-bolder")}>
            SISTEMA DE SEGURIDAD Y SALUD EN EL TRABAJO
          </h2>
        </div>
        <div className={clsx(styles.loginSection, "col-md-6 d-flex align-items-center justify-content-center")}>
          <form className="w-75">
            <div className="contenedor-user text-center">
              <CiUser className={clsx(styles.labelLogin, "fs-1 ")} />
            </div>
            <h3 className="text-center mb-4">Bienvenido!</h3>
            <div className="mb-3">
              <label htmlFor="username" className={clsx(styles.labelLogin, "form-label ")}>
                Usuario
              </label>
              <input type="text" className="form-control" id="username" placeholder="Ingrese su usuario" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className={clsx(styles.labelLogin, "form-label ")}>
                Contraseña
              </label>
              <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" required />
            </div>
            <div className="d-grid">
              <button type="submit" className={styles.buttonLogin}>
                INGRESAR
              </button>
            </div>
            <p className="mt-3 text-muted">
              <a href="#" className="text-decoration-none text-black">
                No tienes una cuenta aun? <span className={styles.registerlabel}>Registrate</span>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
