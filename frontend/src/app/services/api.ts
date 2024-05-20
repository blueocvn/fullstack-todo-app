import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginModel, LoginResponse, RegisterModel, RegisterResponse } from '../../types/Auth';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterModel>({
      query: (body) => ({ method: 'POST', url: 'api/register', body }),
    }),

    login: builder.mutation<LoginResponse, LoginModel>({
      query: (body) => ({ method: 'POST', url: 'api/login', body }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = api;
