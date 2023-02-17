import Cross from '../../assets/cross.svg';

import styles from './error.module.css';

export const Error = () => (
  <div className={styles.container} data-test-id='error'>
    <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
    <button className={styles.cross} type='button'>
      <img src={Cross} alt='icon-cross' />
    </button>
  </div>
);
