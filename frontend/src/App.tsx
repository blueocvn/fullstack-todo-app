import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';
import AuthOutlet from './components/layouts/AuthOutlet';

const Register = lazy(() => import('./features/auth/Register'));

function App() {
  return (
    <>
      <ToastContainer hideProgressBar />
      <Routes>
        <Route path={ROUTE.AUTH.auth} element={<AuthOutlet />}>
          <Route path={ROUTE.AUTH.register} element={<Register />} index />
        </Route>
      </Routes>
    </>
  );
}

export default App;
