/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Container } from './components/container';
import { Footer } from './components/footer';
import { LoginForm } from './components/form/login-form';
import { RecoveryPassForm } from './components/form/recovery-form';
import { RegisterForm } from './components/form/register-form';
import { Header } from './components/header';
import { AuthPage } from './pages/auth';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules';
import { TreatyPage } from './pages/treaty';
import { store } from './redux/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Container>
          <Header />
          <Routes>
            <Route
              path='/auth'
              element={
                <AuthPage>
                  <LoginForm />
                </AuthPage>
              }
            />
            <Route
              path='/registration'
              element={
                <AuthPage>
                  <RegisterForm />
                </AuthPage>
              }
            />
            <Route
              path='/forgot-pass'
              element={
                <AuthPage>
                  <RecoveryPassForm />
                </AuthPage>
              }
            />
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
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
