import { createReducer, on } from '@ngrx/store';
import { PagerSetting } from '../../../shared/models/PagerSetting';
import { OrderListItem } from '../../models/order-list-item';
import { OrderSearch } from '../../models/order-search';
import { PagedList } from '../../models/PagedList';
import { SortSetting } from '../../models/SortSetting';
import { pageOrdersBeginAction, searchOrdersBeginAction, searchOrdersEndAction, sortOrdersBeginAction } from './orders-actions';

export class OrderState {
  orderSearch: OrderSearch;
  orderSearchResult: PagedList<OrderListItem>;
  pageSetting = new PagerSetting();
  sortSetting = new SortSetting();
}

export const initialState = new OrderState();

export const ordersReducer = createReducer(
  initialState,
  on(searchOrdersBeginAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return {
      ...state, orderSearch: action.orderSearch }
  }),
  on(sortOrdersBeginAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return {
      ...state, sortSetting: action.sortSetting
    }
  }),
  on(pageOrdersBeginAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return {
      ...state, pageSetting: action.pagerSetting }
  }),
  on(searchOrdersEndAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return { ...state, orderSearchResult: action.orderSearchResult }
  })
  //sortOrdersBeginAction
)
