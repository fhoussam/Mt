import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiQueryErrorResponseAction, ApiQueryOkResponseAction, ApiQuerySentAction } from './reducers/api-query/api-query-actions';

@Injectable()
export class ApiQueryInterceptor implements HttpInterceptor {
  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      this.store.dispatch(ApiQuerySentAction());
    }
    return next.handle(req).pipe(tap(event => {
      if (req.method != 'GET') {
        if (event.type === HttpEventType.Response) {
          if (event.ok) {
            this.store.dispatch(ApiQueryOkResponseAction());
          }
          else {
            this.store.dispatch(ApiQueryErrorResponseAction());
          }
        }
      }
    }), catchError((error: HttpErrorResponse) => {
      this.store.dispatch(ApiQueryErrorResponseAction());
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        console.log('This is client side error');
        errorMsg = `Error: ${error.error.message}`;
      } else {
        console.log('This is server side error');
        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      }
      console.log(errorMsg);
      return throwError(errorMsg);
    }))
  }
}
