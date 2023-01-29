import { createSelector } from "@ngrx/store";
import { AppFeatureState } from "../AppFeatureState";

export const selectAppState = (state: AppFeatureState) => state;

export const orderSearchResultSelector = createSelector(
  selectAppState,
  (state: AppFeatureState) => state.orders.orderSearchResult
);

export const orderForEditSelector = createSelector(
  selectAppState,
  (state: AppFeatureState) => state.orders.orderForEdit
);
