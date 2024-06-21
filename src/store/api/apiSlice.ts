import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Board, Card } from "../../types";

export const apiSlice = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://task-manager-backend-9lp9.onrender.com",
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
          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
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
        url: `board/update/${id}`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Board", id: arg.id }],
    }),
    deleteBoard: build.mutation({
      query: (id) => ({
        url: `board/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Board", id: arg.id }],
    }),
    getCardsByBoardId: build.query<Card[], string>({
      query: (id) => ({
        url: `card/cards/${id}`,
        method: "GET",
      }),
      providesTags: ["Card"],
      transformResponse: (response: Card[]) => {
        const cards = response.map((card) => {
          /* eslint no-underscore-dangle: 0 */
          return { ...card, id: card._id };
        });
        return cards;
      },
    }),
    createCard: build.mutation({
      query: ({ title, description, boardId, status }) => ({
        url: "card/create",
        method: "POST",
        body: { title, description, boardId, status },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Card", id: arg.id }],
    }),
    updateCard: build.mutation({
      query: ({ title, id, description, status }) => ({
        url: `card/update/${id}`,
        method: "PUT",
        body: { title, description, status },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "Card" }],
      invalidatesTags: () => [{ type: "Card" }],
    }),
    updateCardStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `card/updateStatus/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: () => [{ type: "Card" }],
    }),
    deleteCard: build.mutation({
      query: (id) => ({
        url: `card/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (arg) => [{ type: "Card", id: arg.id }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetCardsByBoardIdQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
  useUpdateCardStatusMutation,
  useDeleteCardMutation,
} = apiSlice;
