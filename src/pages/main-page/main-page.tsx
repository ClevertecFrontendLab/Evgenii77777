import { HeaderMain } from '@components/header';
import { ContentMain } from '@components/content';
import { FooterMain } from '@components/footer';
import { LayoutMain } from '@components/layout';

const MainPage = () => {
    const routes = [
        {
            name: 'Главная',
        },
    ];

    return (
        <LayoutMain routes={routes}>
            <HeaderMain />
            <ContentMain />
            <FooterMain />
        </LayoutMain>
    );
};

export default MainPage;
