import React from 'react';
import { APP_ROUTES } from '../constants/routes/appRoutes';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminNotiPage from '../pages/admin/AdminNotiPage';
import GoogleCallBack from '../pages/auth/GoogleCallBack';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import HistoryPage from '../pages/user/HistoryPage';
import HomePage from '../pages/user/HomePage';
import NotiPage from '../pages/user/NotiPage';
import SharingPage from '../pages/user/SharingPage';

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
  {
    path: APP_ROUTES.SHARING,
    element: <SharingPage />,
    isPrivate: true,
  },
  {
    path: APP_ROUTES.HISTORY,
    element: <HistoryPage />,
    isPrivate: true,
  },
  {
    path: APP_ROUTES.NOTI,
    element: <NotiPage />,
    isPrivate: true,
  },
  {
    path: APP_ROUTES.ADMIN_LOGIN,
    element: <AdminLoginPage />,
    isPrivate: false,
  },
  {
    path: APP_ROUTES.ADMIN_NOTI,
    element: <AdminNotiPage />,
    isPrivate: true,
  },
];
