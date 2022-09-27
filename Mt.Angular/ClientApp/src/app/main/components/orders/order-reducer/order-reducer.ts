import { createReducer, on } from "@ngrx/store";
import { OrderSearchQuery } from "../../../models/order-search";
import * as OrderActions from './order-actions';

export interface IOrderState {
  from: Date | null;
  to: Date | null;
  shipCountry: string;
  customerId: string;
}

export const orderInitialState = {
  from: null,
  to: null,
  shipCountry: "",
  customerId: ""
}

export const reducers = createReducer(
  orderInitialState,
  on(OrderActions.getOrders, (state) => ({ ...state, shipCountry : "France" }))
);

