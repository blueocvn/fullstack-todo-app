import { TaskIcon } from '../components/common/Icons';
import { AppRoute } from '../interfaces/route';

export const ROUTE = {
  ROOT: '',

  AUTH: {
    REGISTER: 'register',
    LOGIN: 'login',
    FOGOTPASSWOLD: 'fogotPasswold',
    CHANGEPASSWOLD: 'changePasswold'
  },
  TASK: {
    ROOT: 'tasks',
  },
  USER:{
    PROFILE: 'profile',
  }
};

export const AppRoutes: AppRoute[] = [
  {
    title: 'Task',
    path: ROUTE.TASK.ROOT,
    icons: TaskIcon,
  },
];
