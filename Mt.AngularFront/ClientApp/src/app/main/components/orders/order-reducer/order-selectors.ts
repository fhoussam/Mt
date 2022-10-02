import { createSelector } from "@ngrx/store";
import { IAppStateInterface } from "./order-reducer";

export const selectFeature = (state: IAppStateInterface) => state.orders;

export const selectOrderQueryResult = createSelector(
  selectFeature, (state) => state.searchResult
);
