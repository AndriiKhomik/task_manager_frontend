import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getBoards: build.query({
      query: () => ({
        url: "board/boards",
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetBoardsQuery } = boardApi;
