import { SocialLink } from '../../social-links';

import styles from './footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.text}>© 2020-2023 Cleverland. Все права защищены.</p>
    <ul className={styles.list}>
      {SocialLink.map((el) => (
        <li key={el.name}>
          <a href='/'>
            <img src={el.link} alt={el.name} />
          </a>
        </li>
      ))}
    </ul>
  </footer>
);
