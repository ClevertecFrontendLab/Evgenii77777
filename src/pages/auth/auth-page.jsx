import { Outlet } from 'react-router-dom';

import styles from './auth-page.module.css';

export const AuthPage = () => (
  <div className={styles.container} data-test-id='auth'>
    <h1 className={styles.title}>Cleverland</h1>
    <Outlet />
  </div>
);
