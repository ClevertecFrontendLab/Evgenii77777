import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import 'antd/dist/antd.css';
import cn from 'classnames';

import { Overlay } from '@components/overlay';
import { postLogin, postReg } from '@redux/thunk/async/post-user';
import { addUser, deleteType } from '@redux/actions/post-user';
import { AuthForm } from '@components/form/auth-form';
import { RegForm } from '@components/form/reg-form';

import Logo from './assets/logo.png';
import styles from './auth-page.module.css';

export const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [emailValid, setEmailValid] = useState(false);
    const isError = useSelector((state) => state.login.error);
    const status = useSelector((state) => state.login.status);
    const type = useSelector((state) => state.login.type);
    const message = useSelector((state) => state.login.message);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isError && type === 'login') {
            navigate('/result/error-login');
        } else if (type === 'login' && !isError) {
            navigate('/main');
            dispatch(deleteType(''));
        } else if (!isError && type === 'registration') {
            navigate('/result/success');
        } else if (status === 409 && type === 'registration') {
            navigate('/result/error-user-exist');
        } else if (status !== 409 && type === 'registration' && isError) {
            navigate('/result/error');
        } else if (type === 'forgot' && !isError) {
            navigate('/auth/confirm-email');
            dispatch(deleteType(''));
        } else if (type === 'forgot' && message === 'Email не найден' && isError) {
            navigate('/result/error-check-email-no-exist');
        } else if (type === 'forgot' && isError && message !== 'Email не найден') {
            navigate('/result/error-check-email');
        } else if (type === 'confirm' && !isError) {
            navigate('/auth/change-password');
            dispatch(deleteType(''));
        } else if (type === 'change' && isError) {
            navigate('/result/error-change-password');
        } else if (type === 'change' && !isError) {
            navigate('/result/success-change-password');
        }
    }, [dispatch, isError, message, navigate, status, type]);

    const onFinish = (values) => {
        location.pathname === '/auth'
            ? dispatch(postLogin(values)).then(() => {
                  if (localStorage.getItem('JWT') || sessionStorage.getItem('JWTSession')) {
                      navigate('/main');
                  }
              }) && dispatch(addUser(values))
            : dispatch(
                  postReg({
                      email: values.email,
                      password: values.password,
                  }),
              ) &&
              dispatch(
                  addUser({
                      email: values.email,
                      password: values.password,
                  }),
              );
    };

    const validateMessages = {
        required: '${label}',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
    };

    return (
        <section className={styles.wrapper}>
            <Overlay />
            <div
                className={cn(styles.container, {
                    [styles.containerPass]:
                        location.pathname === '/auth/change-password' ||
                        location.pathname === '/auth/confirm-email',
                })}
            >
                {(location.pathname === '/auth' || location.pathname === '/auth/registration') && (
                    <>
                        <img className={styles.logo} src={Logo} alt='logo' />
                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <NavLink
                                    className={({ isActive }) =>
                                        cn(styles.link, {
                                            [styles.activeLink]: isActive,
                                        })
                                    }
                                    to={'/auth'}
                                    end
                                >
                                    Вход
                                </NavLink>
                            </li>
                            <li className={styles.item}>
                                <NavLink
                                    className={({ isActive }) =>
                                        cn(styles.link, {
                                            [styles.activeLink]: isActive,
                                        })
                                    }
                                    to={'/auth/registration'}
                                    end
                                >
                                    Регистрация
                                </NavLink>
                            </li>
                        </ul>
                        <Form
                            className={styles.form}
                            validateMessages={validateMessages}
                            initialValues={{ remember: false }}
                            onFinish={onFinish}
                            form={form}
                            onFieldsChange={() =>
                                setEmailValid(
                                    form.isFieldTouched('email') &&
                                        form.getFieldError('email').length === 0,
                                )
                            }
                        >
                            {location.pathname === '/auth' && (
                                <AuthForm email={form.getFieldValue('email')} form={form} />
                            )}
                            {location.pathname === '/auth/registration' && <RegForm />}
                            <Form.Item className={styles.box}>
                                <Button
                                    className={styles.enterBtn}
                                    type='primary'
                                    htmlType='submit'
                                    data-test-id={
                                        location.pathname === '/auth'
                                            ? 'login-submit-button'
                                            : 'registration-submit-button'
                                    }
                                >
                                    Войти
                                </Button>
                                <Button className={styles.googleBtn} type='primary'>
                                    <GooglePlusOutlined />
                                    {location.pathname === '/auth' ? 'Войти ' : 'Регистрация '}{' '}
                                    через Google
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {(location.pathname === '/auth/confirm-email' ||
                    location.pathname === '/auth/change-password') && <Outlet />}
            </div>
        </section>
    );
};
