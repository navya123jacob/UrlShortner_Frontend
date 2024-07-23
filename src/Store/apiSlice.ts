import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backend=import.meta.env.VITE_BACKEND;
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: backend }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string, password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<any, { name: string, email: string, password: string }>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    createLink: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/create_link',
        method: 'POST',
        body,
      }),
    }),
    fetchUrls: builder.query<any, string>({
      query: (userId) => `/fetch_urls/${userId}`,
    }),
    deleteLink: builder.mutation<any, { urlId: string }>({
      query: (body) => ({
        url: '/delete_link',
        method: 'PATCH',
        body,
      }),
    }),
    getLongUrl: builder.query<any, string>({
      query: (shortUrl) => `/get_long_url/${shortUrl}`,
    }),
    clicksCreate: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/clicks_create',
        method: 'POST',
        body,
      }),
    }),
    fetchLinkData: builder.query<any, { id: string; userId: string }>({
      query: ({ id, userId }) => `/fetch_link_data/${id}/${userId}`,
    }),
    fetchClicksForUrl: builder.query<any, string>({
      query: (id) => `/fetch_clicks_for_url/${id}`,
    }),
    totalClicksData: builder.query<any, void>({
      query: () => '/fetch_total_clicks',
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCreateLinkMutation,
  useFetchUrlsQuery,
  useDeleteLinkMutation,
  useGetLongUrlQuery,
  useClicksCreateMutation,
  useFetchLinkDataQuery,
  useFetchClicksForUrlQuery,
  useTotalClicksDataQuery,
} = apiSlice;
