// routes/config.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/Notfound'));
const Register = lazy(() => import('../pages/Register'));

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Login',
    element: <Register />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
];

export default routeConfig;
