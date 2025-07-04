import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Patients'],
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => '/patients',
      providesTags: ['Patients'],
    }),
    addPatient: builder.mutation({
      query: (newPatient) => ({
        url: '/patients',
        method: 'POST',
        body: newPatient,
      }),
      invalidatesTags: ['Patients'],
    }),
    // Add updatePatient, deletePatient here later
  }),
});

export const {
  useGetPatientsQuery,
  useAddPatientMutation,
} = patientsApi;
