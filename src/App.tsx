// App.tsx
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";
import AppRoutes from "./routes"; // aqui sim estamos importando uma função
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter basename="/agenda">
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
