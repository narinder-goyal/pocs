import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/constants";
import { User } from "@/types/user";

interface LoginResponse {
  data: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): User => {
        return response.data;
      },
    }),

    register: builder.mutation<User, any>({
      query: (body) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): User => {
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
