import { apiSlice } from "../App/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials},
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
              url: '/auth/login',
              method: 'POST',
              body: { ...credentials },
            }),
        }),
    }),
});

export const  {
    useRegisterMutation,useLoginMutation
} = authApiSlice