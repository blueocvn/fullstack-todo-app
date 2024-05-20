import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';
import AuthOutlet from './components/layouts/AuthOutlet';
import PrivateOutlet from './components/layouts/PrivateOutlet';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';

const Register = lazy(() => import('./features/auth/Register'));
const TaskList = lazy(() => import('./features/task/TaskList'));
const Login = lazy(() => import('./features/auth/Login'));
const Profile = lazy(() => import("./features/user/UserProfile"))
const ForgotPassword = lazy(() => import("./features/auth/ForgotPassword"))
const ChangePassword = lazy(() => import("./features/auth/ChangePassword"))
function App() {
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return (
        <>
            <ToastContainer hideProgressBar />
            <Routes>
                <Route path={ROUTE.ROOT} element={<AuthOutlet />}>
                    <Route path={ROUTE.AUTH.REGISTER} element={<Register />} index />
                    <Route path={ROUTE.AUTH.LOGIN} element={<Login />} />
                    <Route path={ROUTE.AUTH.FOGOTPASSWORD} element={<ForgotPassword />} />
                    <Route path={ROUTE.AUTH.CHANGEPASSWORD} element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                    <Route path={ROUTE.USER.PROFILE} element={<Profile  />} />
                </Route>
                <Route path={'*'} element={<ProtectedRoute><PrivateOutlet /></ProtectedRoute>}>
                    <Route index path="task" element={<TaskList />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
