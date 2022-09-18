import { createReducer, on } from '@ngrx/store';
import { increment, multiply } from './orders-actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => { console.log('increment'); return state + 1; }),
  on(multiply, (state) => { console.log('multiply X2'); return state * 2; })
)
