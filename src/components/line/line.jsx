import { Link } from 'react-router-dom';

import styles from './line.module.css';

export const Line = ({ category, name }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <Link to={`/books/${category}`}>{category}</Link>
      <span className={styles.line}>/</span>
      <p>{name}</p>
    </div>
  </div>
);
