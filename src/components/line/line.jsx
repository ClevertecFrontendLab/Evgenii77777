import { Link } from 'react-router-dom';

import styles from './line.module.css';

export const Line = ({ category, name, path }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <Link data-test-id='breadcrumbs-link' to={`/books/${path}`}>
        {category}
      </Link>
      <span className={styles.line}>/</span>
      <p data-test-id='book-name'>{name}</p>
    </div>
  </div>
);
