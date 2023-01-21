import { createSelector } from "@ngrx/store";
import { AppState } from "../AppState";

export const selectAppState = (state: AppState) => state;

export const orderSearchResultSelector = createSelector(
  selectAppState,
  (state: AppState) => state.orders.orderSearchResult
);

export const orderForEditSelector = createSelector(
  selectAppState,
  (state: AppState) => state.orders.orderForEdit
);
