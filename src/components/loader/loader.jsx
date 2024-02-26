import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from './base-loader.json';

import styles from './loader.module.css';

export const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const authLoader = useSelector((state) => state.login.loading);

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
