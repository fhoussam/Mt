import { createSelector } from "@ngrx/store";
import { AppRootState } from "../AppRootState";

export const selectAppState = (state: AppRootState) => state;

export const apiQueryStateSelector = createSelector(
  selectAppState,
  (state: AppRootState) => state.apiQuery
);
