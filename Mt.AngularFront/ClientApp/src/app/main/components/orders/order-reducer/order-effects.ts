import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs";
import { EMPTY } from "rxjs/internal/observable/empty";
import { OrderSearchQuery } from "../../../models/order-search";
import { MtService } from "../../../services/mt-angular-http.service";
import * as OrderActions from "./order-actions";

@Injectable()
export class OrderEffects {
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.getOrdersBegin),
    mergeMap((actionData) => {
      return this.mtService.getOrders(0, 5, actionData.searchQuery)
        .pipe(
          map(orders => {
            return OrderActions.getOrdersSuccess({ actionProp: orders.content })
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

