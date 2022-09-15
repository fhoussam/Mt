import { createReducer, on } from '@ngrx/store';
import { loadOrdersBegin, loadOrderSuccess } from './orders-actions';

export const initialState = 0;

export const orderReducer = createReducer(
  initialState,
  on(loadOrdersBegin, (state) => { console.log('loadOrdersBegin'); return state; }),
  on(loadOrderSuccess, (state) => { console.log('loadOrderSuccess'); return state; }),
)
