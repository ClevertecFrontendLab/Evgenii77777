import { useLocation } from 'react-router-dom';
import {
    WarningFilled,
    CloseCircleFilled,
    CheckCircleFilled,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import Back from './assets/image.png';

import styles from './icon-error.module.css';
import { useSelector } from 'react-redux';

export const IconError = () => {
    const location = useLocation();
    const isError = useSelector((state) => state.login.error);
    const error =
        location.pathname.includes('error') &&
        location.pathname !== '/result/error-login' &&
        location.pathname !== '/result/error-check-email';
    const errorAuth = location.pathname === '/auth/confirm-email' && isError;

    return (
        <>
            {location.pathname === '/auth/confirm-email' && !isError && (
                <ExclamationCircleFilled
                    className={styles.icon}
                    style={{ color: 'rgb(47, 84, 235)' }}
                />
            )}
            {location.pathname === '/result/error-login' && (
                <WarningFilled className={styles.icon} style={{ color: ' rgb(250, 173, 20) ' }} />
            )}
            {(location.pathname === '/result/success' ||
                location.pathname === '/result/success-change-password') && (
                <CheckCircleFilled className={styles.icon} style={{ color: 'rgb(82, 196, 26) ' }} />
            )}
            {(error || errorAuth) && (
                <CloseCircleFilled className={styles.icon} style={{ color: 'rgb(255, 77, 79) ' }} />
            )}
            {location.pathname === '/result/error-check-email' && (
                <img src={Back} alt='icon-error' />
            )}
        </>
    );
};
