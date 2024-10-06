import clsx from "clsx";
import styles from "./styles/login.module.css";
import { CiUser } from "react-icons/ci";
import Image from "next/image"; // Si estás usando Next.js para optimizar imágenes
import petropiar from '../assets/logopetropiar.JPG'
import { metadata } from "../layout";
import FormLogin from "./FormLogin";
metadata.title = 'Login'
function LoginPage() {
  
  return (
    <>
      <FormLogin />
     
    </>
  );
}

export default LoginPage;
