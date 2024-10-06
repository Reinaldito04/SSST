import styles from './styles/CardWelcomeUser.module.css';
import Image from 'next/image';
import Link from 'next/link';

function CardWelcomeUser({ image, text }) {
  return (
    <Link href={{ pathname: '/login', query: { Type: text } }}style={{
      textDecoration: 'none',
    }}>
      <div className={styles.container} style={{ cursor: 'pointer' }}>
        <div className={styles.carpert}>
          <div className={styles.content}>
            <Image src={image} width={200} height={200} alt="User Image" />
            <div className="container mb-2">
              <p className="text-white fs-5 fw-bolder text-center">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardWelcomeUser;
