import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiQueryERRORResponseAction, ApiQueryOkResponseAction, ApiQuerySentAction } from './reducers/api-query/api-query-actions';

@Injectable()
export class ApiQueryInterceptor implements HttpInterceptor {
  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(ApiQuerySentAction());
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.store.dispatch(ApiQueryOkResponseAction());
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            this.store.dispatch(ApiQueryERRORResponseAction());
          }
        }
      )
    );
  }
}
