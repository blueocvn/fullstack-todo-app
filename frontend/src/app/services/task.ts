import { TaskAddFormValues } from '../../interfaces/form';
import { Response } from '../../interfaces/response';
import { TaskResponse } from '../../interfaces/task';
import { api } from './api';

const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TaskResponse, void>({
      query: () => '/tasks/',
      providesTags: ['Task'],
    }),
    createTask: build.mutation<Response, TaskAddFormValues>({
      query: (task) => ({
        method: 'POST',
        body: task,
        url: '/tasks/',
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<void, number>({
      query: (id) => ({
        method: 'DELETE',
        url: `/tasks/${id}`,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } = taskApi;
