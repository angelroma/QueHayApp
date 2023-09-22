import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {supabase} from '@shared/api/client';

type Credentials = {
  email: string;
  password: string;
};

export const authApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    loginUser: builder.mutation({
      queryFn: async (credentials: Credentials) => {
        const {data, error} = await supabase.auth.signInWithPassword(
          credentials,
        );
        console.log('error', error);
        if (error) {
          return {
            error: {
              name: error.name,
              message: error.message,
              status: error.status,
            },
          };
        }
        return {
          data: data,
        };
      },
    }),
  }),
});

export const {useLoginUserMutation} = authApi;
