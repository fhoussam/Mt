import { ActionReducerMap } from "@ngrx/store";
import { counterReducer } from "./orders/orders-reducer";

export interface IAppState {
  counter: number;
}

export const appReducer: ActionReducerMap<IAppState> = {
  counter: counterReducer
};
