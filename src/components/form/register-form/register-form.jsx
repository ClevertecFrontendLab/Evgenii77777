/* eslint-disable import/no-extraneous-dependencies */
import { Fragment, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import cn from 'classnames';

import { postNewUser } from '../../../redux/thunk/async/post-new-user';
import { addNewUser, addUser } from '../../../redux/user/user-actions';
import { bigLetter, latLetters, maskPattern, number, pattern, ruLetters } from '../../../validation/regular';
import { validateEmail, validateLogin, validatePassword } from '../../../validation/validation';
import { ButtonOrder } from '../../buttons/button-order';
import { AuthError } from '../../error/auth-error';
import { Input } from '../../input';
import { INPUT_TYPES } from '../../input/input-types/input-types';
import { Loader } from '../../loader';

import st from '../../input/input.module.css';
import styles from '../login-form/login-form.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [blur, setBlur] = useState(false);
  const [blurPassword, setBlurPassword] = useState(false);
  const isLoading = useSelector((state) => state.newUser.loadingRegister);
  const isError = useSelector((state) => state.newUser.errorRegister);
  const status = useSelector((state) => state.newUser.statusRegister);
  const user = useSelector((state) => state.user.user);
  const [isPlaseholder, setIsPlaceholder] = useState(false);
  const onChangePlaceholder = () => setIsPlaceholder(true);
  const methods = useForm({ mode: 'all', reValidateMode: 'onChange' });
  const {
    control,
    handleSubmit,
    getFieldState,
    watch,
    formState: { errors, isValid },
  } = methods;
  const onValidation = (name, reg) => watch(name)?.match(reg);

  const errorPhone = (value, err) => {
    if (err?.type === 'required') {
      return (
        <span data-test-id='hint' className={st.errorMessage}>
          Поле не может быть пустым
        </span>
      );
    }

    if (err?.type === 'pattern') {
      return (
        <span data-test-id='hint' className={st.errorMessage}>
          В формате +375 (xx) xxx-xx-xx
        </span>
      );
    }

    return (
      <span className={st.helpText} data-test-id='hint'>
        В формате +375 (xx) xxx-xx-xx
      </span>
    );
  };

  const onSubmit = (data) => {
    if (step === 1) {
      dispatch(addNewUser(data));
      setStep(step + 1);
    } else if (step === 2) {
      dispatch(addUser(data));
      setStep(step + 1);
    } else {
      dispatch(addUser(data));
      dispatch(postNewUser({ ...data }));
      setSuccess(true);
    }
  };

  if (localStorage.getItem('JWT')) return <Navigate to='/books/all' />;

  if (isLoading) return <Loader />;

  if (isError && status === 'Request failed with status code 400' && success)
    return (
      <AuthError
        name='Данные не сохранились'
        descr='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
        text='назад к регистрации'
        type='button'
        func={() => {
          setStep(1);
          setSuccess(false);
        }}
      />
    );

  if (isError && status !== 'Request failed with status code 400' && success)
    return (
      <AuthError
        name='Данные не сохранились'
        descr='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
        text='повторить'
        type='button'
        func={() => {
          dispatch(postNewUser({ ...user }));
        }}
      />
    );

  if (!isError && success) {
    return (
      <AuthError
        name='Регистрация успешна'
        descr='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
        text='вход'
        type='button'
        func={() => {
          setStep(1);
          navigate('/auth');
          setSuccess(false);
        }}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
        <h2 className={styles.title}>Регистрация</h2>
        <p className={styles.step}>{step} шаг из 3</p>
        {step === 1 && (
          <Fragment>
            <div className={styles.formInput}>
              <Input
                name='username'
                validationRules={validateLogin}
                helpText='Используйте для логина латинский алфавит и цифры'
                label='Логин'
                placeholder='Придумайте логин для входа'
                required={true}
                type={INPUT_TYPES.TEXT}
                isDirty={getFieldState('username').isDirty}
                errorMessage={errors.username?.message}
                letter={onValidation('username', latLetters)}
                letterRu={onValidation('username', ruLetters)}
                num={onValidation('username', number)}
                onBlur={() => setBlur(true)}
                onChange={() => setBlur(false)}
                blur={blur}
              />
            </div>
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
          </Fragment>
        )}
        {step === 2 && (
          <Fragment>
            <div>
              <Input
                name='firstName'
                label='Имя'
                placeholder='Имя'
                required={true}
                type={INPUT_TYPES.TEXT}
                isDirty={getFieldState('firstName').isDirty}
                errorMessage={errors.firstName?.message}
              />
            </div>
            <div className={styles.wrapperStep}>
              <Input
                name='lastName'
                placeholder='Фамилия'
                label='Фамилия'
                required={true}
                type={INPUT_TYPES.TEXT}
                isDirty={getFieldState('lastName').isDirty}
                errorMessage={errors.lastName?.message}
              />
            </div>
          </Fragment>
        )}
        {step === 3 && (
          <Fragment>
            <div className='modal-input-line_container'>
              <div className={st.inputContainer}>
                <label className={st.inputLabel}>
                  {isPlaseholder && <span className={st.spanFocus}>Номер телефона</span>}
                  <Controller
                    control={control}
                    name='phone'
                    placeholder='Номер телефона'
                    rules={{
                      required: true,
                      pattern,
                    }}
                    render={({ field }) => (
                      <MaskedInput
                        {...field}
                        mask={maskPattern}
                        onFocus={onChangePlaceholder}
                        className={cn(st.input, {
                          inputError: errors.phone,
                          inputFocus: isPlaseholder,
                        })}
                        guide={true}
                        keepCharPositions={true}
                        placeholderChar='x'
                        type='tel'
                      />
                    )}
                  />
                </label>
              </div>
              <div>{errorPhone(watch('phone'), errors.phone)}</div>
            </div>
            <div className={styles.wrapperStep}>
              <Input
                name='email'
                validationRules={validateEmail}
                placeholder='E-mail'
                label='Почта'
                required={true}
                type={INPUT_TYPES.TEXT}
                errorMessage={errors.email?.message}
              />
            </div>
          </Fragment>
        )}
        {(step === 1 || step === 2) && (
          <ButtonOrder type='submit' text={step === 1 ? 'следующий шаг' : 'последний шаг'} dis={!isValid} />
        )}
        {step === 3 && <ButtonOrder type='submit' text='зарегистрироваться' dis={!isValid} />}
        <div className={styles.wrapper}>
          <p className={styles.question}>Есть учётная запись?</p>
          <Link to='/auth'>войти</Link>
        </div>
      </form>
    </FormProvider>
  );
};
