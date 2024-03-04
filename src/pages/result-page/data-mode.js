export const dataMode = [
    {
        type: '/result/error-login',
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте еще раз',
        textBtn: 'Повторить',
        id: 'login-retry-button',
    },
    {
        type: '/result/success',
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        textBtn: 'Войти',
        id: 'registration-enter-button',
    },
    {
        type: '/result/error-user-exist',
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        textBtn: 'Назад к регистрации',
        id: 'registration-back-button',
    },
    {
        type: '/result/error-check-email-no-exist',
        title: 'Такой e-mail не зарегистрирован',
        text: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        textBtn: 'Попробовать снова',
        id: 'check-retry-button',
    },
    {
        type: '/result/error-check-email',
        title: 'Что-то пошло не так',
        text: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        textBtn: 'Назад',
        id: 'check-back-button',
    },
    {
        type: '/result/error-change-password',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так. Попробуйте ещё раз',
        textBtn: 'Повторить',
        id: 'change-retry-button',
    },
    {
        type: '/result/success-change-password',
        title: 'Пароль успешно изменен',
        text: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        textBtn: 'Вход',
        id: 'change-entry-button',
    },
    {
        type: '/result/error',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        textBtn: 'Повторить',
        id: 'registration-retry-button',
    },
    {
        type: '/feedbacks',
        title: 'Отзыв успешно опубликован',
        textBtn: 'Отлично',
        error: false,
    },
    {
        type: '/feedbacks',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так.Попробуйте ещё раз.',
        textBtn: 'Написать отзыв',
        textBtnSecond: 'Закрыть',
        id: 'write-review-not-saved-modal',
        error: true,
    },
];
