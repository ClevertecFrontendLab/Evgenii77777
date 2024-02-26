import { useDispatch } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import 'antd/dist/antd.css';

import { passReg } from '@components/validation/validation';
import { changePassword } from '@redux/thunk/async/post-user';
import { addUser } from '@redux/actions/post-user';

import styles from '../confirm-email/confirm-email.module.css';

export const ChangePass = () => {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(changePassword(values));
        dispatch(addUser(values));
    };

    const validateMessages = {
        required: '${label}',
        types: {
            password: '${label} is not a valid number!',
        },
    };

    const { Title } = Typography;

    return (
        <>
            <Title className={styles.title} level={3}>
                Восстановление аккауанта
            </Title>
            <Form className={styles.form} validateMessages={validateMessages} onFinish={onFinish}>
                <Form.Item
                    className={styles.pass}
                    name='password'
                    rules={[
                        {
                            required: true,
                            min: 8,
                            pattern: passReg,
                            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                        },
                    ]}
                    hasFeedback
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                >
                    <Input.Password placeholder='Пароль' data-test-id='change-password' />
                </Form.Item>
                <Form.Item
                    className={styles.confirm}
                    name='confirmPassword'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пароли не совпадают',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>
                <Form.Item className={styles.box}>
                    <Button
                        className={styles.enterBtn}
                        type='primary'
                        htmlType='submit'
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
