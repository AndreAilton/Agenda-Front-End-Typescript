// App.tsx
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from './components/Loading';
import AppRoutes from './routes'; // aqui sim estamos importando uma função
import Navbar from './components/navbar';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
export default App;