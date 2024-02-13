import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { Container } from '@components/conatiner/container';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Container>
                <HashRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                    </Routes>
                </HashRouter>
            </Container>
        </Provider>
    </React.StrictMode>,
);
