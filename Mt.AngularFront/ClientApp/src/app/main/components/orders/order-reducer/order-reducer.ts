import { createReducer, on } from "@ngrx/store";
import { OrderListItem } from "../../../models/order-list-item";
import * as OrderActions from './order-actions';

export interface IOrderState {
  from: Date | null;
  to: Date | null;
  shipCountry: string;
  customerId: string;
  listProp: OrderListItem[];
}

export const orderInitialState: IOrderState = {
  from: null,
  to: null,
  shipCountry: "",
  customerId: "",
  listProp: []
}

export const reducers = createReducer(
  orderInitialState,
  on(OrderActions.getOrdersBegin, (state, action) => {
    console.log("recevied getOrdersBegin action", action);
    var result = { ...state, shipCountry: action.shipCountry };
    return result;
  }),
  on(OrderActions.getOrdersSuccess, (state, action) => {
    console.log("recevied getOrdersSuccess action", action);
    var result = { ...state, listProp: action.actionProp };
    return result;
  })
);

