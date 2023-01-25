import { createAction } from '@ngrx/store';
import { PagerSetting } from '../../../shared/models/PagerSetting';
import { OrderEdit } from '../../models/order-edit';
import { OrderEditUpdate } from '../../models/order-edit-update';
import { OrderListItem } from '../../models/order-list-item';
import { OrderSearch } from '../../models/order-search';
import { PagedList } from '../../models/PagedList';
import { SortSetting } from '../../models/SortSetting';

export const searchOrdersBeginAction = createAction('[ORDERS] SEARCH BEGIN', (orderSearch: OrderSearch) => ({ orderSearch }));
export const sortOrdersBeginAction = createAction('[ORDERS] SORT BEGIN', (sortSetting: SortSetting) => ({ sortSetting }));
export const pageOrdersBeginAction = createAction('[ORDERS] PAGE BEGIN', (pagerSetting: PagerSetting) => ({ pagerSetting }));
export const searchOrdersEndAction = createAction('[ORDERS] SEARCH END', (orderSearchResult: PagedList<OrderListItem>) => ({ orderSearchResult }));
export const selectOrderForEditBeginAction = createAction('[ORDERS] SELECT FOR EDIT BEGIN', (id: number) => ({ id }));
export const selectOrderForEditEndAction = createAction('[ORDERS] SELECT FOR EDIT END', (orderDetailForEdit: OrderEdit) => ({ orderDetailForEdit }));
export const updateOrderBeginAction = createAction('[ORDERS] UPDATE BEGIN', (id: number, order: OrderEditUpdate) => ({ id, order }));
