import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';
import PrivateOutlet from './components/layouts/PrivateOutlet';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';

const Register = lazy(() => import('./features/auth/Register'));
const TaskList = lazy(() => import('./features/task/TaskList'));
const TaskAdd = lazy(() => import('./features/task/TaskAdd'));
const Login = lazy(() => import('./features/auth/Login'));
const Profile = lazy(() => import('./features/user/UserProfile'));
const ForgotPassword = lazy(() => import('./features/auth/ForgotPassword'));
const ChangePassword = lazy(() => import('./features/auth/ChangePassword'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return (
    <>
      <ToastContainer hideProgressBar theme="colored" autoClose={2000} />
      <Routes>
        <Route path={ROUTE.AUTH.REGISTER} element={<Register />} />
        <Route path={ROUTE.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTE.AUTH.FOGOTPASSWORD} element={<ForgotPassword />} />
        
        <Route
          path={ROUTE.ROOT}
          element={
            <ProtectedRoute>
              <PrivateOutlet />
            </ProtectedRoute>
          }
        >
          <Route index path={ROUTE.TASK.ROOT} element={<TaskList />} />
          <Route path={ROUTE.TASK.CREATE} element={<TaskAdd />} />
          <Route path={ROUTE.USER.PROFILE} element={<Profile />} />
          <Route path={ROUTE.AUTH.CHANGEPASSWORD} element={<ChangePassword />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
