import { createAction } from '@ngrx/store';
import { PagerSetting } from '../../../shared/models/PagerSetting';
import { OrderListItem } from '../../models/order-list-item';
import { OrderSearch } from '../../models/order-search';
import { PagedList } from '../../models/PagedList';
import { SortSetting } from '../../models/SortSetting';

export const searchOrdersBeginAction = createAction('[ORDERS] SEARCH BEGIN', (orderSearch: OrderSearch) => ({ orderSearch }));
export const sortOrdersBeginAction = createAction('[ORDERS] SORT BEGIN', (sortSetting: SortSetting) => ({ sortSetting }));
export const pageOrdersBeginAction = createAction('[ORDERS] PAGE BEGIN', (pagerSetting: PagerSetting) => ({ pagerSetting }));
export const searchOrdersEndAction = createAction('[ORDERS] SEARCH END', (orderSearchResult: PagedList<OrderListItem>) => ({ orderSearchResult }));
