import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Board } from "../../types";

export const apiSlice = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["Board", "Card"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    getBoards: build.query<Board[], string>({
      query: () => ({
        url: "board/boards",
      }),
      providesTags: ["Board"],
      transformResponse: (response: Board[]) => {
        const boards = response.map((board) => {
          return { ...board, id: board._id };
        });
        return boards;
      },
    }),
    createBoard: build.mutation({
      query: (title) => ({
        url: "board/create",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Board", id: arg.id }],
    }),
    updateBoard: build.mutation({
      query: ({ title, id }) => ({
        url: "board/update",
        method: "PATCH",
        body: { title, id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Board", id: arg.id }],
    }),
    deleteBoard: build.mutation({
      query: (id) => ({
        url: "board/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Board", id: arg.id }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = apiSlice;
