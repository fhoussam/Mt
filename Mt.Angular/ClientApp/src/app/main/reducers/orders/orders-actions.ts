import { createAction } from '@ngrx/store';
import { OrderListItem } from '../../models/order-list-item';
import { OrderSearch } from '../../models/order-search';
import { PagedList } from '../../models/PagedList';

export const searchOrdersBeginAction = createAction('[ORDERS] SEARCH BEGIN', (orderSearch: OrderSearch) => orderSearch);
export const searchOrdersEndAction = createAction('[ORDERS] SEARCH END', (orderSearchResult: PagedList<OrderListItem>) => orderSearchResult);

