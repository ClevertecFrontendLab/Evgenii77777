import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Layout, Button, Card } from 'antd';
import 'antd/dist/antd.css';

import styles from './footer.module.css';

const { Footer } = Layout;
const { Meta } = Card;

export const FooterMain = () => (
    <Footer className={styles.footer}>
        <Button className={styles.review} type='text'>
            Смотреть отзывы
        </Button>
        <Card
            className={styles.wrap}
            actions={[
                <Button className={styles.os} type='text'>
                    <AndroidFilled />
                    Android OS
                </Button>,
                <Button className={styles.os} type='text'>
                    <AppleFilled />
                    Apple iOS
                </Button>,
            ]}
        >
            <Meta
                className={styles.meta}
                title='Скачать на телефон'
                description='Доступно в PRO-тарифе'
            />
        </Card>
    </Footer>
);
