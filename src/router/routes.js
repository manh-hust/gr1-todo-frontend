import React from 'react';
import { APP_ROUTES } from '../constants/routes/appRoutes';
import GoogleCallBack from '../pages/auth/GoogleCallBack';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import HomePage from '../pages/user/HomePage';

export const routes = [
  {
    path: APP_ROUTES.HOME,
    element: <HomePage />,
    isPrivate: true,
  },
  {
    path: APP_ROUTES.LOGIN,
    element: <LoginPage />,
    isPrivate: false,
  },
  {
    path: APP_ROUTES.REGISTER,
    element: <RegisterPage />,
    isPrivate: false,
  },
  {
    path: APP_ROUTES.GOOGLE_CALLBACK,
    element: <GoogleCallBack />,
    isPrivate: false,
  },
];
