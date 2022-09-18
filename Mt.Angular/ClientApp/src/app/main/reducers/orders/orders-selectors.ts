import { IAppState } from "../app-state";

export const selectCounter = (state: IAppState) => state.counter;
