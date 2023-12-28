import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [{ id: 1, text: "TypeScript", completed: true },
          { id: 2, text: "TodoList", completed: false }
        ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTodo: Todo = {
        id: state.todos.length + 1,
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    completedTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, completedTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;