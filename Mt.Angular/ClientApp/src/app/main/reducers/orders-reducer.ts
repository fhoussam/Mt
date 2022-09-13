import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './orders-actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => { console.log('increment'); return state + 1; }),
  on(decrement, (state) => { console.log('decrement'); return state + 1; }),
  on(reset, (state) => { console.log('reset'); return state + 1; })
)
