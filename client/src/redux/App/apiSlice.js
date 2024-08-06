import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


export const apiSlice = createApi({
    baseQuery,
    endpoints: () => ({}),
});