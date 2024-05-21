import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginModel, LoginResponse, RegisterModel, RegisterResponse, ResetPasswordModel } from '../../types/Auth';
import { GetAllTaskResponse, TaskModel } from '../../types/Task';
import { getTokens } from '../../utils/storage';
import { CreateTeamModel, TeamModel } from '../../types/Team';

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

    // task
    getTaskDetail: builder.query<any, string>({
      query: (task_id) => `api/tasks/${task_id}`,
    }),

    createTask: builder.mutation<{ code: string }, TaskModel>({
      query: (body) => ({ method: 'POST', url: 'api/tasks', body }),
    }),

    assignTask: builder.mutation<{ code: string }, { task_id: string, body: { member_id: string } }>({
      query: ({ task_id, body }) => ({ method: 'PUT', url: `api/tasks/${task_id}/assign`, body }),
    }),

    deleteTask: builder.mutation<{ code: string }, string>({
      query: (id) => ({ method: 'DELETE', url: `api/tasks/${id}` }),
    }),

    getAllTaskByOwner: builder.query<GetAllTaskResponse[], void>({
      query: () => 'api/tasks',
    }),

    // user
    searchUsersByEmail: builder.query<any[], string>({
      query: (search) => `api/users?search=${search}`,
    }),

    // team
    createNewTeam: builder.mutation<TeamModel, CreateTeamModel>({
      query: (body) => ({ method: 'POST', url: 'api/teams', body }),
    }),

    addNewMember: builder.mutation<any, { team_id: string, body: { email: string } }>({
      query: ({ team_id, body }) => ({ method: 'POST', url: `api/teams/${team_id}/add`, body }),
    }),

    getAllTeamByUser: builder.query<TeamModel[], void>({
      query: () => 'api/teams',
    }),

    getTeamDetail: builder.query<TeamModel, string>({
      query: (team_id) => `api/teams/${team_id}`,
    }),

    getTasksByTeam: builder.query<any[], string>({
      query: (team_id) => `api/teams/${team_id}/tasks`,
    }),

    getMembersByTeam: builder.query<any[], string>({
      query: (team_id) => `api/teams/${team_id}/members`,
    }),

    getMembersByLeader: builder.query<any[], string>({
      query: (leader_id) => `api/users/leader/${leader_id}/members`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  // task
  useGetTaskDetailQuery,
  useGetAllTaskByOwnerQuery,
  useCreateTaskMutation,
  useAssignTaskMutation,
  useDeleteTaskMutation,
  // user
  useLazySearchUsersByEmailQuery,
  // team
  useCreateNewTeamMutation,
  useAddNewMemberMutation,
  useGetAllTeamByUserQuery,
  useGetTeamDetailQuery,
  useGetTasksByTeamQuery,
  useGetMembersByTeamQuery,
  useGetMembersByLeaderQuery
} = api;
