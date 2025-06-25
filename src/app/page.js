import Image from "next/image";
import styles from "./styles/page.module.css";
import Administrador from "./assets/icon-admins.png";
import Analista from "./assets/icon-empleados.png";
import { metadata } from "./layout";
import clsx from "clsx";
import CardWelcomeUser from "./components/CardWelcomeUser";
import { redirect } from "next/navigation";
export default function Home() {
  metadata.title = "Sistema Gestion";
  redirect("/login");
  return null;
}
