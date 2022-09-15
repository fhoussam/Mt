import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { OrderSearch } from "../models/order-search";
import { MtService } from "../services/mt-angular-http.service";
import { loadOrderSuccess, loadOrdersBegin } from "./orders-actions";

@Injectable()
export class OrdersEffects {

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(loadOrdersBegin),
    tap(x => console.log('effect triggered', x)),
    mergeMap((x) => this.mtService.getOrders(0, 10, x.orderSearch)
      .pipe(
        map(orders => loadOrderSuccess({ orderSearchResult: orders })),
        tap(x => console.log('effect executed', x)),
        catchError(() => EMPTY)
      ))
  ));

  constructor(private actions$: Actions, private mtService: MtService) { }
}
