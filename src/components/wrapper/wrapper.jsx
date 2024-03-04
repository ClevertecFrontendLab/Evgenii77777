import styles from './wrapper.module.css';

export const Wrapper = ({ children }) => (
    <div className={styles.containerError}>
        <div className={styles.boxError}>{children}</div>
    </div>
);
