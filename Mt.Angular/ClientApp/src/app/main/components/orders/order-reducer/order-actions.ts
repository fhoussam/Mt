import { createAction, props } from "@ngrx/store";
import { OrderListItem } from "../../../models/order-list-item";

export const getOrdersBegin = createAction("[Orders] Get Orders Begin", props<{ shipCountry: string }>());
export const getOrdersSuccess = createAction("[Orders] Get Orders Success", props<{ orders: OrderListItem[] }>());
