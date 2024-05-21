import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginModel, LoginResponse, RegisterModel, RegisterResponse, ResetPasswordModel } from '../../types/Auth';
import { GetAllTaskResponse } from '../../types/Task';
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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useGetAllTaskByOwnerQuery,
  // user
  useLazySearchUsersByEmailQuery,
  // team
  useCreateNewTeamMutation,
  useGetAllTeamByUserQuery,
  useGetTeamDetailQuery,
  useGetTasksByTeamQuery,
  useGetMembersByTeamQuery
} = api;
