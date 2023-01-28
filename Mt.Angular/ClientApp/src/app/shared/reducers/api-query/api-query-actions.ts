import { createAction } from '@ngrx/store';

export const ApiQuerySentAction = createAction('[API_QUERY] SENT');
export const ApiQueryOkResponseAction = createAction('[API_QUERY] OK');
export const ApiQueryERRORResponseAction = createAction('[API_QUERY] ERROR');
