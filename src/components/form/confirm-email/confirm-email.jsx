import VerificationInput from 'react-verification-input';
import { Typography } from 'antd';
import 'antd/dist/antd.css';

import { IconError } from '@components/icon-error';

import styles from './confirm-email.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '@redux/thunk/async/post-user';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;

export const ConfirmEmail = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.login.email);
    const isError = useSelector((state) => state.login.error);
    const [confirmValue, setConfirmvalue] = useState('');
    useEffect(() => {
        if (confirmValue.length === 6 && isError) {
            setConfirmvalue('');
        }
    }, [confirmValue, isError]);

    return (
        <>
            <div className={styles.wrapper}>
                <IconError />
                <Title className={styles.title} level={2}>
                    {!isError && 'Введите код для восстановления аккауанта'}
                    {isError && 'Неверный код. Введите код для восстановления аккауанта'}
                </Title>
                <Paragraph className={styles.text}>
                    Мы отправили вам на e-mail <span className={styles.email}>{email}</span>{' '}
                    шестизначный код. Введите его в поле ниже.
                </Paragraph>
                <VerificationInput
                    value={confirmValue}
                    onChange={setConfirmvalue}
                    inputProps={{ 'data-test-id': 'verification-input' }}
                    onComplete={(value) =>
                        dispatch(
                            confirmEmail({
                                email: email,
                                code: value,
                            }),
                        )
                    }
                    classNames={{
                        container: styles.box,
                        character: isError ? styles.characterError : 'character',
                        characterInactive: styles.inactive,
                        characterSelected: styles.selected,
                        characterFilled: styles.filled,
                    }}
                />
                <Paragraph className={styles.text}>
                    Не пришло письмо? Проверьте папку Спам.
                </Paragraph>
            </div>
        </>
    );
};
