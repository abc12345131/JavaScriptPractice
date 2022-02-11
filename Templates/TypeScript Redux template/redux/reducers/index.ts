import { combineReducers } from 'redux';
import { RootState } from '../types';
import { todoReducer } from './todos';

export const rootReducer = combineReducers<RootState>({
  todos: todoReducer
});

export type { RootState };