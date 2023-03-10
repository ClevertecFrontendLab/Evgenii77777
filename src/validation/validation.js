/* eslint-disable consistent-return */
export const validateEmail = (fieldValue) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValue)) {
    return 'Введите корректный e-mail';
  }
};

export const validatePassword = (fieldValue) =>
  /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(fieldValue) ||
  'Пароль не менее 8 символов, с заглавной буквой и цифрой';

export const validateLogin = (fieldValue) =>
  /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/.test(fieldValue) || 'Используйте для логина латинский алфавит и цифры';

export const validatePhone = (fieldValue) => {
  const trimSpace = fieldValue.replace(/\s/g, '');

  return /^\+375\((33|29|25|44)\)\d{3}-\d{2}-\d{2}/.test(trimSpace) || 'В формате +375 (xx) xxx-xx-xx';
};
