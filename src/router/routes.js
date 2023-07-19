import React from 'react';
import { APP_ROUTES } from '../constants/routes/appRoutes';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import HomePage from '../pages/user/HomePage';

export const routes = [
  {
    path: APP_ROUTES.HOME,
    element: <HomePage />,
    isPrivate: false,
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
];
