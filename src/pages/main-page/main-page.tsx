import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

import { HeaderMain } from '@components/header';
import { ContentMain } from '@components/content';
import { FooterMain } from '@components/footer';
import { SiderDesc } from '@components/sider/sider-desc';
import { SiderMob } from '@components/sider/sider-mob';

import 'antd/dist/antd.css';
import styles from './main-page.module.css';

const MainPage = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem('JWT') === 'undefined' &&
            sessionStorage.getItem('JWTSession') === 'undefined'
        ) {
            navigate('/auth');
        }
    }, [navigate]);

    return (
        <Layout className={styles.layout}>
            <SiderDesc collapsed={collapsed} setCollapsed={setCollapsed} />
            <SiderMob collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout className={styles.container} style={{ width: '100%' }}>
                <HeaderMain />
                <ContentMain />
                <FooterMain />
            </Layout>
        </Layout>
    );
};

export default MainPage;
