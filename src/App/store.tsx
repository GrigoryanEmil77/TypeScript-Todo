import { configureStore } from '@reduxjs/toolkit';
//import logger from 'redux-logger';
import todoReducer from '../features/todoSlice';


export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

