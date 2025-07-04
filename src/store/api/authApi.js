import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (credentials) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { email, password } = credentials;
        
        // Hardcoded login logic for testing
        if (email === 'randall@novatus.com' && password === '1234') {
          return {
            data: {
              id: 1,
              name: 'Randall N.',
              email: 'randall@novatus.com',
              roles: ['admin'],
              permissions: ['read:all', 'write:all']
            }
          };
        } else {
          return {
            error: {
              status: 401,
              data: { message: 'Invalid credentials' }
            }
          };
        }
      },
    }),
    signup: builder.mutation({
      query: (newUser) => ({
        url: '/auth/signup',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
