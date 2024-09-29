import Image from "next/image";
import styles from "./styles/page.module.css";
import Administrador from "./assets/icon-admins.png";
import Analista from './assets/icon-empleados.png'
import { metadata } from "./layout";
import clsx from "clsx";
import CardWelcomeUser from "./components/CardWelcomeUser";
export default function Home() {
  metadata.title = "SSST";

  return (
    <div>
      <div className="container d-flex mx-auto justify-content-between align-items-center mt-2">
        <div>LOGO</div>
        <h1 className={clsx(styles.title, "text-center")}>
          SISTEMA DE SEGURIDAD Y SALUD EN EL TRABAJO
        </h1>
        <div>LOGO</div>
      </div>
      <div className={clsx(styles.lineRed, "mb-4")}></div>

      {/* <h1 className={clsx(styles.title,'text-center')}>
        ssst
      </h1> */}
      <div className="container d-flex justify-content-center">
        <p className="fs-4 fw-bolder">POR FAVOR,ELIJA SU TIPO DE USUARIO</p>
      </div>
      <div className={clsx(styles.contenedorCards,"container  d-flex mx-auto flex-row justify-content-between align-items-center")}>
        <CardWelcomeUser image={Administrador} text="ADMINISTRADOR" />
        <CardWelcomeUser image={Analista} text="ANALISTA" />
      </div>
    </div>
  );
}
