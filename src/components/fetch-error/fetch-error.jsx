import cn from 'classnames';
import { Typography, Button } from 'antd';
import 'antd/dist/antd.css';

import { IconError } from '@components/icon-error';
import { Path } from '@constants/path';

import styles from './fetch-error.module.css';

const { Title, Paragraph } = Typography;

export const FetchError = ({ title, text, id, textBtn, func, type, textBtnSecond, funcSecond }) => (
    <>
        <IconError />
        <Title
            className={cn(styles.title, {
                [styles.titleErr]: location.pathname === Path.ERRR0R_CHEK_EMAIL_NO_EXIST,
            })}
            level={2}
        >
            {title}
        </Title>
        <Paragraph
            className={cn(styles.text, {
                [styles.textSuccess]: location.pathname === Path.SUCCES_CHANGE_PASS,
            })}
        >
            {text}
        </Paragraph>
        <div className={styles.box}>
            <Button
                className={cn(styles.btnSend, {
                    [styles.btnSendErr]: location.pathname === Path.ERRR0R_CHEK_EMAIL_NO_EXIST,
                    [styles.btnSendError]:
                        location.pathname === Path.ERROR_CHECK_EMAIL ||
                        (location.pathname === Path.FEEDBACKS && type !== '/feedbacks'),
                })}
                onClick={func}
                data-test-id={id}
                type='primary'
            >
                {textBtn}
            </Button>
            {location.pathname === Path.FEEDBACKS && type === '/feedbacks' && (
                <Button className={styles.secondBtn} type='default' funcSecond onClick={funcSecond}>
                    {textBtnSecond}
                </Button>
            )}
        </div>
    </>
);
