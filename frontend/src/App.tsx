import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTE } from './configs/routes';
import { lazy } from 'react';
import AuthOutlet from './components/layouts/AuthOutlet';
import PrivateOutlet from './components/layouts/PrivateOutlet';

const Register = lazy(() => import('./features/auth/Register'));
const TaskList = lazy(() => import('./features/task/TaskList'));

function App() {
  return (
    <>
      <ToastContainer hideProgressBar />
      <Routes>
        <Route path={ROUTE.ROOT} element={<AuthOutlet />}>
          <Route index element={<Register />} />
        </Route>
        <Route path={'*'} element={<PrivateOutlet />}>
          <Route index path="task" element={<TaskList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
