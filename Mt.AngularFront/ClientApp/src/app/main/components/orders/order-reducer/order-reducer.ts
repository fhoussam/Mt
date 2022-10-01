import { createReducer, on } from "@ngrx/store";
import { OrderListItem } from "../../../models/order-list-item";
import { OrderSearchQuery } from "../../../models/order-search";
import * as OrderActions from './order-actions';

export interface IOrderState {
  searchQuery: OrderSearchQuery;
  listProp: OrderListItem[];
}

export const orderInitialState: IOrderState = {
  searchQuery: new OrderSearchQuery(),
  listProp: []
}

export const reducers = createReducer(
  orderInitialState,
  on(OrderActions.getOrdersBegin, (state, action) => {
    console.log("recevied getOrdersBegin action", action);
    let result: IOrderState = {
      ...state, searchQuery: action
    };
    return result;
  }),
  on(OrderActions.getOrdersSuccess, (state, action) => {
    console.log("recevied getOrdersSuccess action", action);
    var result = { ...state, listProp: action.actionProp };
    return result;
  })
);

