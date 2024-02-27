import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';

import { defaultOptions } from '@constants/constant';
import { loadinglSelector } from '@constants/selector';

import styles from './loader.module.css';

export const Loader = () => {
    const authLoader = useSelector(loadinglSelector);

    return (
        <>
            {authLoader && (
                <div className={styles.container} data-test-id='loader'>
                    <div className={styles.overlay}></div>
                    <div className={styles.wrapper}>
                        <Lottie options={defaultOptions} height={150} width={150} />
                    </div>
                </div>
            )}
        </>
    );
};
