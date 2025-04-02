// routes/config.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/Notfound'));
const Register = lazy(() => import('../pages/Register'));
const Perfil = lazy(() => import('../pages/Perfil'));

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Auth',
    element: <Register />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/Perfil',
    element: <Perfil />,
  }
];

export default routeConfig;
