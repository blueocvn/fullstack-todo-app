import { Task } from '../../interfaces/task';
import { api } from './api';

const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => '/tasks/',
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
