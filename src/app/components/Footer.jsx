import clsx from 'clsx';
import styles from './styles/Layout.module.css';

function Footer({ isOpen }) {  // Desestructuramos el prop isOpen correctamente
  return (
    <footer className={clsx(styles.footer, { [styles.open]: isOpen })}>
      <div className="container">
        {/* <span>© Copyright 2024 | Realizado por Reinaldo Bellorin</span> */}
      </div>
    </footer>
  );
}

export default Footer;
