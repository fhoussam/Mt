import { createReducer, on } from "@ngrx/store";
import { OrderListItem } from "../../../models/order-list-item";
import * as OrderActions from './order-actions';

export interface IOrderState {
  from: Date | null;
  to: Date | null;
  shipCountry: string;
  customerId: string;
  orders: OrderListItem[];
}

export const orderInitialState: IOrderState = {
  from: null,
  to: null,
  shipCountry: "",
  customerId: "",
  orders: []
}

export const reducers = createReducer(
  orderInitialState,
  on(OrderActions.getOrdersBegin, (state, action) => {
    var result = { ...state, shipCountry: action.shipCountry };
    return result;
  }),
  //on(OrderActions.getOrdersSuccess, (state, action) => {
  //  var result = { ...state, orders: action.orders };
  //  return result;
  //})
);

