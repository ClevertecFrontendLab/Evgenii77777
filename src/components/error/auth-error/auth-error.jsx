import { ButtonOrder } from '../../buttons/button-order';

import styles from './auth-error.module.css';

export const AuthError = ({ func = null, name, descr, text = null, type = null, status = true }) => (
  <div data-test-id='status-block' className={styles.wrapper}>
    <h2 className={styles.title}>{name}</h2>
    <p className={styles.descr}>{descr}</p>
    {status && <ButtonOrder text={text} type={type} func={func} />}
  </div>
);
