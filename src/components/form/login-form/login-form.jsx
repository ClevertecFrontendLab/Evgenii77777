import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { getUser } from '../../../redux/thunk/async/post-new-user';
import { addUser } from '../../../redux/user/user-actions';
import { ButtonOrder } from '../../buttons/button-order';
import { AuthError } from '../../error/auth-error';
import { Input } from '../../input';
import { INPUT_TYPES } from '../../input/input-types/input-types';
import { Loader } from '../../loader';

import styles from './login-form.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [blurPassword, setBlurPassword] = useState(false);
  const error = useSelector((state) => state.newUser.error);
  const isLoading = useSelector((state) => state.newUser.loading);
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.newUser.status);
  const methods = useForm({ mode: 'all' });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    dispatch(getUser(data));
    dispatch(addUser(data));
  };

  if (localStorage.getItem('JWT')) return <Navigate to='/books/all' />;

  if (error && status !== 400)
    return (
      <AuthError
        name='Вход не выполнен'
        descr='Что-то пошло не так. Попробуйте ещё раз'
        text='повторить'
        type='submit'
        func={() => {
          dispatch(getUser(user));
        }}
      />
    );

  if (isLoading) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
        <h2 className={styles.title}>Bход в личный кабинет</h2>
        <div className={styles.formInput}>
          <Input
            name='identifier'
            label='Логин'
            placeholder='Логин'
            required={true}
            type={INPUT_TYPES.TEXT}
            errorMessage={errors.identifier?.message}
            status={status}
          />
        </div>
        <div className={styles.passwordContainer}>
          <Input
            name={INPUT_TYPES.PASSWORD}
            placeholder='Пароль'
            label='Пароль'
            required={true}
            type={INPUT_TYPES.PASSWORD}
            errorMessage={errors.password?.message}
            onBlur={() => setBlurPassword(true)}
            onChange={() => setBlurPassword(false)}
            blur={blurPassword}
          />
        </div>
        {status === 400 && (
          <div className={styles.errorWrapper}>
            <p data-test-id='hint' className={styles.error}>
              Неверный логин или пароль!
            </p>
            <Link to='/forgot-pass'>Восстановить?</Link>
          </div>
        )}
        {status !== 400 && (
          <div className={styles.wrapperForgot}>
            <Link to='/forgot-pass'>Забыли логин или пароль?</Link>
          </div>
        )}
        <ButtonOrder text='Вход' type='submit' />
        <div className={styles.wrapper}>
          <p className={styles.question}>Нет учётной записи?</p>
          <Link to='/registration'>Регистрация</Link>
        </div>
      </form>
    </FormProvider>
  );
};
