import { createAction, props } from '@ngrx/store';
import { OrderListItem } from '../models/order-list-item';
import { OrderSearch } from '../models/order-search';
import { PagedList } from '../models/PagedList';

export const ORDERS_SEARCH_BEGIN = "[Orders] Search Begin";
export const ORDERS_SEARCH_SUCCSESS = "[Orders] Search Success";

export const loadOrdersBegin = createAction(ORDERS_SEARCH_BEGIN, props<{ orderSearch: OrderSearch }>());
export const loadOrderSuccess = createAction(ORDERS_SEARCH_SUCCSESS, props<{ orderSearchResult: PagedList<OrderListItem> }>());

