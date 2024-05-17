import { Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';
import AuthOutlet from './components/layouts/AuthOutlet';

const Register = lazy(() => import('./features/auth/Register'));
const Login = lazy(() => import("./features/auth/Login"))
const EditUser = lazy(() => import("./features/auth/UserProfile"))
function App() {
  return (
    <>
      <ToastContainer hideProgressBar />
        <Routes>
          <Route path={ROUTE.AUTH.auth} element={<AuthOutlet />}>
            <Route path={ROUTE.AUTH.register} element={<Register />} index />
            <Route path={ROUTE.AUTH.login} element={<Login />} />
            <Route path={ROUTE.AUTH.editUser} element={<EditUser />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
