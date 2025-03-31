// routes/index.tsx
import { useRoutes } from 'react-router-dom';
import routeConfig from './config';

export default function AppRoutes() {
  return useRoutes(routeConfig); // ✅ Aqui sim é uma função que retorna os elementos de rota
}
