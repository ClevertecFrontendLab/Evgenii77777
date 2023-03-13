/* eslint-disable complexity */
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { forgotPassword, resetPassword } from '../../../redux/thunk/async/post-new-user';
import { addNewPassword } from '../../../redux/user/user-actions';
import { bigLetter, number } from '../../../validation/regular';
import { validateEmail, validatePassword } from '../../../validation/validation';
import { ButtonOrder } from '../../buttons/button-order';
import { AuthError } from '../../error/auth-error';
import { Input } from '../../input';
import { INPUT_TYPES } from '../../input/input-types/input-types';
import { Loader } from '../../loader';

import styles from '../login-form/login-form.module.css';

export const RecoveryPassForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const errorForgot = useSelector((state) => state.newUser.errorForgot);
  const errorReset = useSelector((state) => state.newUser.errorReset);
  const loading = useSelector((state) => state.newUser.loading);
  const newPAssword = useSelector((state) => state.user.newPAssword);
  const [blurPassword, setBlurPassword] = useState(false);
  const [disBtn, setDisBtn] = useState(false);
  const methods = useForm({
    mode: 'all',
  });
  const {
    handleSubmit,
    watch,
    getFieldState,
    formState: { errors, dirtyFields, isValid },
  } = methods;

  const password = useRef({});

  password.current = watch('password', '');
  const onValidation = (name, reg) => watch(name)?.match(reg);

  const onSubmit = (data) => {
    if (location.search) {
      dispatch(addNewPassword({ ...data, code: location.search.substring(6) }));
      dispatch(resetPassword({ ...data, code: location.search.substring(6) }));
      setSuccess(true);
    } else {
      dispatch(forgotPassword({ email: data.email }));
      setSuccess(true);
    }
  };

  if (localStorage.getItem('JWT')) return <Navigate to='/books/all' />;

  if (loading) {
    return <Loader />;
  }

  if (!errorForgot && !location.search && success) {
    return (
      <AuthError
        status={false}
        name='Письмо выслано'
        descr='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
      />
    );
  }

  if (errorReset) {
    return (
      <AuthError
        name='Данные не сохранились'
        descr='Что-то пошло не так. Попробуйте ещё раз'
        text='повторить'
        type='submit'
        func={() => dispatch(resetPassword(newPAssword))}
      />
    );
  }

  if (!errorReset && success && !errorForgot) {
    return (
      <AuthError
        name='Новые данные сохранены'
        descr='Зайдите в личный кабинет, используя свои логин и новый пароль'
        text='вход'
        type='button'
        func={() => {
          navigate('/auth');
          setSuccess(false);
        }}
      />
    );
  }

  console.log(disBtn);
  console.log(isValid);

  if (location.search) {
    return (
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
          <h2 className={styles.titleRecovery}>Восстановление пароля</h2>
          <div className={styles.formInput}>
            <Input
              name={INPUT_TYPES.PASSWORD}
              validationRules={validatePassword}
              placeholder='Пароль'
              label='Пароль'
              helpText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
              required={true}
              isDirty={getFieldState(INPUT_TYPES.PASSWORD).isDirty}
              type={INPUT_TYPES.PASSWORD}
              errorMessage={errors.password?.message}
              letter={onValidation(INPUT_TYPES.PASSWORD, bigLetter)}
              num={onValidation(INPUT_TYPES.PASSWORD, number)}
              len={watch(INPUT_TYPES.PASSWORD)?.length}
              onBlur={() => setBlurPassword(true)}
              onChange={() => setBlurPassword(false)}
              blur={blurPassword}
            />
          </div>
          <div className={styles.formInput}>
            <Input
              name='passwordConfirmation'
              validationRules={(value) => value === password.current || 'Пароли не совпадают'}
              isDirtyField={dirtyFields.passwordConfirmation}
              placeholder='Повторите пароль'
              label='Повторите пароль'
              required={true}
              type={INPUT_TYPES.PASSWORD}
              errorMessage={errors.passwordConfirmation?.message}
              onBlur={() => {
                setBlurPassword(false);
                setDisBtn(false);
              }}
              onChange={() => {
                setBlurPassword(true);
                setDisBtn(true);
              }}
              blur={blurPassword}
            />
          </div>
          <div className={styles.descrWrapper}>
            <ButtonOrder
              text='сохранить изменения'
              type='submit'
              dis={!isValid && !disBtn}
              func={() => setDisBtn(false)}
            />
            <p className={styles.descr}>После сохранения войдите в библиотеку, используя новый пароль</p>
          </div>
        </form>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
        <div className={styles.linkWrapper}>
          <Link to='/auth'>вход в личный кабинет</Link>
        </div>

        <h2 className={styles.titleRecovery}>Восстановление пароля</h2>

        <div className={styles.formInput}>
          <Input
            name='email'
            validationRules={validateEmail}
            placeholder='E-mail'
            label='Почта'
            required={true}
            type={INPUT_TYPES.TEXT}
            errorMessage={errors.email?.message}
            helpText='На это email  будет отправлено письмо c инструкциями по восстановлению пароля'
            errorForgot={errorForgot}
          />
        </div>
        <ButtonOrder text='восстановить' type='submit' dis={!isValid} />
        <div className={styles.wrapper}>
          <p className={styles.question}>Нет учётной записи?</p>
          <Link to='/registration'>Регистрация</Link>
        </div>
      </form>
    </FormProvider>
  );
};
