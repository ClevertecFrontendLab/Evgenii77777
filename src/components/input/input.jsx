/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import cn from 'classnames';

import done from '../../assets/CheckCircle.svg';
import showPassword from '../../assets/Eye.png';
import hidePassword from '../../assets/EyeClosed.png';

import { INPUT_TYPES } from './input-types/input-types';

import styles from './input.module.css';

export const Input = ({
  name,
  label,
  validationRules,
  required,
  placeholder,
  onChange,
  errorMessage,
  type = 'text',
  defaultValue,
  onBlur,
  dataTestId,
  helpText,
  isDirty = false,
  status = null,
  num = null,
  letter = null,
  len = null,
  letterRu = null,
  errorForgot = false,
  blur = false,
}) => {
  const { register } = useFormContext();
  const passwordWatcher = useWatch({ name: 'password' });
  const inputPasswordStateValues = {
    type: INPUT_TYPES.PASSWORD,
    alt: 'Показать пароль',
    img: hidePassword,
  };
  const inputTextStateValues = {
    type: INPUT_TYPES.TEXT,
    alt: 'Скрыть пароль',
    img: showPassword,
  };
  const [inputTypePassword, toggleInputTypePassword] = useState(inputPasswordStateValues);
  const [inputType, toggleInputType] = useState(type);
  const [isPlaseholder, setIsPlaceholder] = useState(false);
  const onChangePlaceholder = () => setIsPlaceholder(true);

  const inputTypeHandler = () => {
    if (inputTypePassword.type === INPUT_TYPES.PASSWORD) {
      toggleInputTypePassword(inputTextStateValues);
      toggleInputType(INPUT_TYPES.TEXT);
    } else {
      toggleInputTypePassword(inputPasswordStateValues);
      toggleInputType(INPUT_TYPES.PASSWORD);
    }
  };

  const handleValidate = (fieldValue) => {
    if (validationRules) {
      if (name === 'retryPassword')
        return validationRules({
          fieldValue,
          passwordWatcher,
        });

      return validationRules(fieldValue);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>
        {required && ''}
        {isPlaseholder && <span className={styles.spanFocus}>{label}</span>}
        <input
          defaultValue={defaultValue}
          className={cn(styles.input, {
            inputError: errorMessage || status === 400 || errorForgot,
            inputFocus: isPlaseholder,
          })}
          type={inputType}
          placeholder={placeholder}
          onFocus={onChangePlaceholder}
          data-testid={dataTestId}
          {...register(name, {
            required: required && 'Поле не может быть пустым',
            validate: { handleValidate },
            onChange,
            onBlur,
          })}
        />
        {type === INPUT_TYPES.PASSWORD && !errorMessage && isDirty && (
          <img data-test-id='checkmark' className={styles.done} src={done} alt='icon-done' />
        )}
        {type === INPUT_TYPES.PASSWORD && isPlaseholder && (
          <button
            data-test-id={inputTypePassword.type === 'password' ? 'eye-closed' : 'eye-opened'}
            className={styles.eye}
            onClick={inputTypeHandler}
            type='button'
          >
            <img src={inputTypePassword.img} alt='icon-eye' />
          </button>
        )}
      </label>
      {errorForgot && (
        <p data-test-id='hint' className={styles.errorForgot}>
          error
        </p>
      )}
      {!errorMessage && helpText && (
        <p data-test-id='hint' className={styles.helpText}>
          {helpText}
        </p>
      )}
      {errorMessage && name !== 'username' && name !== 'password' && (
        <p data-test-id='hint' className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
      {blur && errorMessage && name === 'username' && (
        <p data-test-id='hint' className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
      {(num === null || letter === null || letterRu !== null) && !blur && isDirty && name === 'username' && (
        <p className={styles.helpText} data-test-id='hint'>
          Используйте для логина
          <span className={letter === null || letterRu !== null ? styles.errorNum : ''}> латинский алфавит </span>и
          <span className={num === null ? styles.errorLetter : ''}> цифры</span>
        </p>
      )}
      {blur && errorMessage && name === 'password' && (
        <p data-test-id='hint' className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}

      {(!num || !letter || len < 8) && !blur && isDirty && name === 'password' && (
        <p className={styles.helpText} data-test-id='hint'>
          Пароль
          <span className={len > 7 ? '' : styles.errorNum}> не менее 8 символов</span>, с
          <span className={letter ? '' : styles.errorNum}> заглавной буквой </span>и
          <span className={num ? '' : styles.errorLetter}> цифрой</span>
        </p>
      )}
    </div>
  );
};
