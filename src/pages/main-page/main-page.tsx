import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    HeartFilled,
    CalendarOutlined,
    ProfileOutlined,
    AndroidFilled,
    AppleFilled,
} from '@ant-design/icons';
import { Layout, Menu, Typography, Button, List, Card, Col, Row } from 'antd';
import { Nav } from '@components/nav/nav';

import Logo from './assets/logo.png';
import LogoMin from './assets/logo_min.png';
import LogoMobile from './assets/logo_mob.png';
import styles from './main-page.module.css';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const data = [
    '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки; ',
    '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;',
    '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
    '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
];

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles.layout}>
            <Sider
                className={styles.sider}
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ background: '#fff' }}
                width={'208px'}
                collapsedWidth={'64px'}
            >
                <div className='logo' />
                <img
                    className={collapsed ? styles.logo : styles.logoFull}
                    src={collapsed ? LogoMin : Logo}
                    alt='logo'
                />
                <Menu
                    className={styles.menu}
                    id='menu'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    style={{ border: 'none' }}
                >
                    <Nav collapsed={collapsed} />
                </Menu>
                <Button
                    data-test-id='sider-switch'
                    style={{ width: '20px' }}
                    onClick={() => setCollapsed(!collapsed)}
                    className='trigger'
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                ></Button>
            </Sider>
            <Sider
                className={collapsed ? styles.siderMobilefull : styles.siderMobile}
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ background: '#fff' }}
                width={'104px'}
                collapsedWidth={'0'}
            >
                <div className='logo' />
                <img className={styles.logoMob} src={collapsed ? '' : LogoMobile} alt='logo' />
                <Menu
                    className={styles.menu}
                    id='menu'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    style={{ border: 'none' }}
                >
                    <Nav collapsed={collapsed} />
                </Menu>
                <Button
                    data-test-id='sider-switch-mobile'
                    onClick={() => setCollapsed(!collapsed)}
                    className='trigger'
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                ></Button>
            </Sider>
            <Layout className={styles.container} style={{ width: '100%' }}>
                <Header className={styles.header}>
                    <Title className={styles.way} level={5}>
                        Главная
                    </Title>
                    <div className={styles.box}>
                        <Title className={styles.title} style={{ margin: 0 }}>
                            Приветствуем тебя в CleverFit — приложении, которое поможет тебе
                            добиться своей мечты!
                        </Title>
                        <Button
                            type='text'
                            className={styles.settings}
                            icon={<SettingOutlined className={styles.iconSetting} />}
                        >
                            <span className={styles.settingsText}> Настройки</span>
                        </Button>
                    </div>
                </Header>
                <Content className={styles.main}>
                    <List
                        className={styles.list}
                        header={<div>С CleverFit ты сможешь:</div>}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item className={styles.item} style={{ padding: 0 }}>
                                <Typography.Text className={styles.text}> {item}</Typography.Text>
                            </List.Item>
                        )}
                    />
                    <Title className={styles.phrase} level={4} style={{ fontWeight: 500 }}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Title>
                    <div className='site-card-wrapper'>
                        <Row gutter={16}>
                            <Col>
                                <Card
                                    className={styles.card}
                                    title='Расписать тренировки'
                                    bordered={false}
                                >
                                    <HeartFilled className={styles.icon} /> Тренировки
                                </Card>
                            </Col>
                            <Col>
                                <Card
                                    className={styles.card}
                                    title='Назначить календарь'
                                    bordered={false}
                                >
                                    <CalendarOutlined className={styles.icon} /> Календарь
                                </Card>
                            </Col>
                            <Col>
                                <Card
                                    className={styles.card}
                                    title='Заполнить профиль'
                                    bordered={false}
                                >
                                    <ProfileOutlined className={styles.icon} /> Профиль
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
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
            </Layout>
        </Layout>
    );
};
