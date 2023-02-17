import Avatar from '../../assets/avatar.jpg';

import styles from './user.module.css';

export const User = ({ name = 'Иван' }) => (
  <div className={styles.container}>
    <p className={styles.greeting}>Привет, {name}!</p>
    <img className={styles.avatar} src={Avatar} alt='avatar' />
  </div>
);
