import { TaskIcon } from '../components/common/Icons';
import { AppRoute } from '../interfaces/route';

export const ROUTE = {
  ROOT: '',

  AUTH: {
    REGISTER: 'register',
    LOGIN: 'login',
    editUser: 'edituser',
  },
  TASK: {
    ROOT: 'tasks',
  },
};

export const AppRoutes: AppRoute[] = [
  {
    title: 'Task',
    path: ROUTE.TASK.ROOT,
    icons: TaskIcon,
  },
];
