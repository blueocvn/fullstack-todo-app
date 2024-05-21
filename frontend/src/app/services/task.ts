import { TaskResponse } from '../../interfaces/task';
import { api } from './api';

const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TaskResponse, void>({
      query: () => '/tasks/',
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
