import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import 'antd/dist/antd.css';

import { Overlay } from '@components/overlay';
import { IconError } from '@components/icon-error';
import { deleteType } from '@redux/actions/post-user';
import { changePassword, forgotPassword, postReg } from '@redux/thunk/async/post-user';
import { dataMode } from './data-mode';

import styles from './result-page.module.css';

export const ResultPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const type = useSelector((state) => state.login.type);
    const user = useSelector((state) => state.login.user);
    const email = useSelector((state) => state.login.email);

    const { Title, Paragraph } = Typography;
    const path = dataMode.filter((el) => el.type === location.pathname);

    const nav = () => {
        if (location.pathname === '/result/error-login') {
            navigate('/auth');
            dispatch(deleteType(''));
        } else if (location.pathname === '/result/error-user-exist') {
            navigate('/auth/registration');
            dispatch(deleteType(''));
        } else if (location.pathname === '/result/error') {
            navigate('/auth/registration');
            dispatch(postReg(user));
            dispatch(deleteType(''));
        } else if (location.pathname === '/result/success') {
            navigate('/auth');
            dispatch(deleteType(''));
        } else if (location.pathname === '/result/error-change-password') {
            dispatch(changePassword(user));
            dispatch(deleteType(''));
        } else if (location.pathname === '/result/success-change-password') {
            navigate('/auth');
            dispatch(deleteType(''));
        } else if (location.pathname === '/result/error-check-email') {
            navigate('/auth');
            dispatch(deleteType(''));
            dispatch(forgotPassword(email));
        } else if (location.pathname === '/result/error-check-email-no-exist') {
            navigate('/auth');
            dispatch(deleteType(''));
        }
    };

    useEffect(() => {
        if (
            localStorage.getItem('JWT') === 'undefined' &&
            sessionStorage.getItem('JWTSession') === 'undefined' &&
            localStorage.getItem('JWT') === null &&
            sessionStorage.getItem('JWTSession') === null &&
            !type
        ) {
            navigate('/auth');
        }
    }, [navigate, type]);

    return (
        <>
            <Overlay />
            <div className={styles.wrapper}>
                {path?.map((el) => (
                    <>
                        <IconError />
                        <Title className={styles.title} level={2}>
                            {el.title}
                        </Title>
                        <Paragraph className={styles.text}>{el.text}</Paragraph>
                        <Button
                            className={styles.btnSend}
                            onClick={() => nav()}
                            data-test-id={el.id}
                            type='primary'
                        >
                            {el.textBtn}
                        </Button>
                    </>
                ))}
            </div>
        </>
    );
};
