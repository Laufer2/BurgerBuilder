import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchApi = createApi({
  reducerPath: 'fetch',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://burger-builder-69125-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders.json',
    })
  }),
});

export const {
  useGetOrdersQuery,
} = fetchApi;