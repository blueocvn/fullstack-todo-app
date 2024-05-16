import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';

const Login = lazy(() => import("./features/auth/Login"))

function App() {
  return (
    <>
      <ToastContainer hideProgressBar />
      <Routes>
        <Route />
        <Route path={ROUTE.AUTH.login} element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
