import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RegisterModel, RegisterResponse } from '../../types/Auth';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterModel>({
      query: (body) => ({ method: 'POST', url: 'api/register', body }),
    }),
  }),
});

export const { useRegisterMutation } = api;
