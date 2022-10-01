import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { EMPTY } from "rxjs/internal/observable/empty";
import { MtService } from "../../../services/mt-angular-http.service";
import * as OrderActions from "./order-actions";

@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.getOrdersBegin),
    mergeMap((actionData) => {
      return this.mtService.getOrders(0, 5, actionData)
        .pipe(
          map(orders => {
            return OrderActions.getOrdersSuccess(orders)
          }),
          catchError(() => EMPTY)
        )})
    ))
  ;

  constructor(
    private actions$: Actions,
    private mtService: MtService
  ) { }
}

