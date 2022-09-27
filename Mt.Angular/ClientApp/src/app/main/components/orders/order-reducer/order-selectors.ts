import { Store } from "@ngrx/store";
import { IOrderState } from "./order-reducer";

export const selectOrders = (state: IOrderState) => state;
