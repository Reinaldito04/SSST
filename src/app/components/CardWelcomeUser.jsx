import styles from './styles/CardWelcomeUser.module.css'; // Cambia la extensión a .module.css
import Image from 'next/image';

function CardWelcomeUser({ image, text }) {
  return (
    <div className={styles.container}>
      <div className={styles.carpert}>
        <div className={styles.content}>
          <Image src={image} width={200} height={200} alt="User Image" />
          <div className="container mb-2">
            <p className="text-white fs-5 fw-bolder text-center">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWelcomeUser;
