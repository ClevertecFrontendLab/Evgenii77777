import styles from './auth-page.module.css';

export const AuthPage = ({ children }) => (
  <div className={styles.container} data-test-id='auth'>
    <h1 className={styles.title}>Cleverland</h1>
    {children}
  </div>
);
