import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    credentials: 'include',
  }),
  tagTypes: ['User', 'Note'], // added 'Note'
  endpoints: (builder) => ({
    // -----------------------
    // Auth / User Endpoints
    // -----------------------
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body: userData,
      }),
    }),

    // -----------------------
    // Note Endpoints
    // -----------------------
    getNotes: builder.query({
      query: () => '/api/notes',
      providesTags: ['Note'],
    }),
    getNote: builder.query({
      query: (id) => `/api/notes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Note', id }],
    }),
    createNote: builder.mutation({
      query: (note) => ({
        url: '/api/notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation({
      query: ({ id, ...note }) => ({
        url: `/api/notes/${id}`,
        method: 'PUT',
        body: note,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Note', id }],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/api/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Note', id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,

  // New Note hooks
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = apiSlice;
