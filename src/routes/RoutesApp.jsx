import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage } from '@pages/auth-page';
import { RegForm } from '@components/form/reg-form';
import { ResultPage } from '@pages/result-page';
import { ProtectedRoutes } from './protected-routes';
import { ConfirmEmail } from '@components/form/confirm-email';
import { ChangePass } from '@components/form/change-pass';
import { AuthForm } from '@components/form/auth-form';
import { Loader } from '@components/loader';

import 'normalize.css';
import '../index.css';

export const RoutesApp = () => {
    const MainPageLazy = lazy(() => import('@pages/main-page/main-page'));
    return (
        <Routes>
            <Route element={<AuthPage />}>
                <Route path='/auth' element={<AuthForm />} />
                <Route path='/auth/registration' element={<RegForm />} />
                <Route path='/auth/confirm-email' element={<ConfirmEmail />} />
                <Route path='/auth/change-password' element={<ChangePass />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route>
                    <Route path='/' element={<Navigate to='/main' />} />
                    <Route
                        path='/main'
                        element={
                            <Suspense fallback={<Loader />}>
                                <MainPageLazy />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path='/result' element={<ResultPage />}>
                    <Route
                        path='/result/error-login'
                        element={<ResultPage mode={'error-login'} />}
                    />
                    <Route path='/result/success' element={<ResultPage mode={'success'} />} />
                    <Route
                        path='/result/error-user-exist'
                        element={<ResultPage mode={'error-user-exist'} />}
                    />
                    <Route
                        path='/result/error-check-email-no-exist'
                        element={<ResultPage mode={'error-check-email-no-exist'} />}
                    />
                    <Route
                        path='/result/error-check-email'
                        element={<ResultPage mode={'error-check-email'} />}
                    />
                    <Route
                        path='/result/error-change-password'
                        element={<ResultPage mode={'error-change-password'} />}
                    />
                    <Route
                        path='/result/success-change-password'
                        element={<ResultPage mode={'success-change-password'} />}
                    />
                    <Route path='/result/error' element={<ResultPage mode={'error'} />} />
                </Route>
            </Route>
        </Routes>
    );
};
