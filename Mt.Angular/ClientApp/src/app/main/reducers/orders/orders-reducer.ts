import { createReducer, on } from '@ngrx/store';
import { OrderListItem } from '../../models/order-list-item';
import { OrderSearch } from '../../models/order-search';
import { PagedList } from '../../models/PagedList';
import { searchOrdersBeginAction, searchOrdersEndAction } from './orders-actions';

export class OrderState {
  orderSearch: OrderSearch;
  orderSearchResult: PagedList<OrderListItem>;
}

export const initialState = new OrderState();

export const ordersReducer = createReducer(
  initialState,
  on(searchOrdersBeginAction, (state, payload) => { console.log('get orders begin, payload', payload); return { ...state, orderSearch: payload } }),
  on(searchOrdersEndAction, (state, payload) => { console.log('get orders end'); return { ...state, orderSearchResult: payload } })
)
