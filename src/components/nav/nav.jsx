import { useNavigate } from 'react-router-dom';

import { dataItems } from './data-items';
import { Path } from '@constants/path';

import styles from './nav.module.css';

export const Nav = ({ collapsed }) => {
    const navigate = useNavigate();

    return (
        <>
            {dataItems.map((el) => (
                <li key={el.label} className={!collapsed ? styles.item : styles.itemMini}>
                    <button
                        className={styles.navBtn}
                        onClick={
                            el.label === 'Выход'
                                ? () => {
                                      localStorage.clear();
                                      sessionStorage.clear();
                                      navigate(Path.AUTH);
                                  }
                                : ''
                        }
                    >
                        <img src={el.icon} alt={el.label} className={styles.icon} />
                        {!collapsed && <span className={styles.tag}>{el.label}</span>}
                    </button>
                </li>
            ))}
        </>
    );
};
