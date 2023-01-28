import { createReducer, on } from '@ngrx/store';
import {
  ApiQuerySentAction,
  ApiQueryOkResponseAction,
  ApiQueryERRORResponseAction
} from './api-query-actions';

export class ApiQueryState {
  apiQueryPending: boolean;
  apiResponseOk: boolean;
  apiResponseError: boolean;
}

export const initialState = new ApiQueryState();

export const apiQueryReducer = createReducer(
  initialState,
  on(ApiQuerySentAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return {
      ...state, apiQueryPending: true, apiResponseError: false, apiResponseOk: false
    }
  }),
  on(ApiQueryOkResponseAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return {
      ...state, apiQueryPending: false, apiResponseError: false, apiResponseOk: true
    }
  }),
  on(ApiQueryERRORResponseAction, (state, action) => {
    console.log('action ' + action.type + ' received, sending following payload to effect', action);
    return {
      ...state, apiQueryPending: false, apiResponseError: true, apiResponseOk: false
    }
  })
)
