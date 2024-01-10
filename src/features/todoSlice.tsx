import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
      getTodos: builder.query<Todo[], { limit?: number }>({
        query: ({ limit = 15 }) => `todos?_limit=${limit}`,  
        providesTags: (result) =>
          result ? [{ type: 'Todo' }] : [],
      }),
      addTodo: builder.mutation<Todo, Partial<Todo>>({
        query: (newtodo) => ({
          url: 'todos',
          method: 'POST',
          body: newtodo ,
        }),
        invalidatesTags: ['Todo'],
      }),
      
    }),
  });
export const { useGetTodosQuery, useAddTodoMutation } = todosApi;
