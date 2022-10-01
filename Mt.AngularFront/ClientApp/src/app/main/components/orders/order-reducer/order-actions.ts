import { createAction, props } from "@ngrx/store";
import { OrderListItem } from "../../../models/order-list-item";
import { OrderSearchQuery } from "../../../models/order-search";
import { PagedList } from "../../../models/PagedList";

export const getOrdersBegin = createAction("[Orders] Get Orders Begin", props<OrderSearchQuery>());
export const getOrdersSuccess = createAction("[Orders] Get Orders Success", props<PagedList<OrderListItem>>());
