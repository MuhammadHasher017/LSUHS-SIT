import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Orders'], 
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),

    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'], 
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: updatedFields,
      }),
      invalidatesTags: ['Orders'],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
