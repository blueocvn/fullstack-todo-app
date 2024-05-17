import { Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';
import AuthOutlet from './components/layouts/AuthOutlet';
import PrivateOutlet from './components/layouts/PrivateOutlet';

const Register = lazy(() => import('./features/auth/Register'));
const TaskList = lazy(() => import('./features/task/TaskList'));
const Login = lazy(() => import('./features/auth/Login'));
const EditUser = lazy(() => import("./features/auth/UserProfile"))
function App() {
  return (
    <>
      <ToastContainer hideProgressBar />
        <Routes>
          <Route path={ROUTE.ROOT} element={<AuthOutlet />}>
            <Route path={ROUTE.AUTH.REGISTER} element={<Register />} index />
            <Route path={ROUTE.AUTH.LOGIN} element={<Login />} />
            <Route path={ROUTE.AUTH.editUser} element={<EditUser />} />
         </Route>
        <Route path={'*'} element={<PrivateOutlet />}>
          <Route index path="task" element={<TaskList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
