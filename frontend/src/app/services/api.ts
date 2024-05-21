import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginModel, LoginResponse, RegisterModel, RegisterResponse, ResetPasswordModel } from '../../types/Auth';
import { GetAllTaskResponse, TaskModel } from '../../types/Task';
import { getTokens } from '../../utils/storage';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      const { access_token } = getTokens();
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterModel>({
      query: (body) => ({ method: 'POST', url: 'api/register', body }),
    }),

    login: builder.mutation<LoginResponse, LoginModel>({
      query: (body) => ({ method: 'POST', url: 'api/login', body }),
    }),

    resetPassword: builder.mutation<{ code: string }, ResetPasswordModel>({
      query: (body) => ({ method: 'PATCH', url: 'api/reset-password', body }),
    }),

    createTask: builder.mutation<{ code: string }, TaskModel>({
      query: (body) => ({ method: 'POST', url: 'api/tasks', body }),
    }),

    deleteTask: builder.mutation<{ code: string }, string>({
      query: (id) => ({ method: 'DELETE', url: `api/tasks/${id}` }),
    }),

    getAllTaskByOwner: builder.query<GetAllTaskResponse[], void>({
      query: () => 'api/tasks',
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useGetAllTaskByOwnerQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = api;
