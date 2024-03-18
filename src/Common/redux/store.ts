import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redusers/dataSlice';

export const store = configureStore({
  reducer: rootReducer,
});