import styles from './empthy-category.module.css';

export const EmpthyCategory = ({ value, maxSorted, minSorted }) => (
  <div className={styles.container}>
    {!value && (
      <p data-test-id='empty-category' className={styles.text}>
        В этой категории книг ещё нет
      </p>
    )}
    {(maxSorted.length === 0 || minSorted.length === 0) && value && (
      <p data-test-id='search-result-not-found' className={styles.text}>
        По запросу ничего не найдено
      </p>
    )}
  </div>
);
