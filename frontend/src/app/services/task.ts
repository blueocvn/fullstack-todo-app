import { TaskAddFormValues } from '../../interfaces/form';
import { Response } from '../../interfaces/response';
import { TaskResponse } from '../../interfaces/task';
import { api } from './api';

const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TaskResponse, void>({
      query: () => '/tasks/',
    }),
    createTask: build.mutation<Response, TaskAddFormValues>({
      query: (task) => ({
        method: 'POST',
        body: task,
        url: '/tasks/',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi;
