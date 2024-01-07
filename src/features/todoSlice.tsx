import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  
interface TodoState {
    todos: Todo[];
   
  }
  
const initialState: TodoState = {
    todos: [],
   
  };

export const fetchTodo = createAsyncThunk(
    'todos/fetchTodos',
    async (limit: number = 10) => {
      try {
        const response = await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch todos');
      }
    }
  );

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
              const newTodo: Todo = {
                id: state.todos.length + 1,
                title: action.payload,
                completed: false,
              };
              state.todos.push(newTodo);
            },
    completedTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
   extraReducers: builder => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});
export const { addTodo, completedTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;