import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { Container } from './components/container';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules';
import { TreatyPage } from './pages/treaty';
import { persistor, store } from './redux/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Header />
            <Routes>
              <Route>
                <Route path='/' element={<Navigate to='/books/all' />} />
                <Route path='/books/:category' element={<MainPage />} />
                <Route path='/rules' element={<RulesPage />} />
                <Route path='/treaty' element={<TreatyPage />} />
              </Route>
              <Route path='/books/:category/:bookId' element={<BookPage />} />
            </Routes>
            <Footer />
          </Container>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
