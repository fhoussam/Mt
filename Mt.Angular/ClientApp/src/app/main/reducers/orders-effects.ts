import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { OrderSearch } from "../models/order-search";
import { MtService } from "../services/mt-angular-http.service";
import { increment, multiply } from "./orders-actions";

@Injectable()
export class OrdersEffects {

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(increment),
    tap(x => console.log('effect triggered', x)),
    mergeMap((x) => this.mtService.getOrders(0, 10, new OrderSearch())
      .pipe(
        map(orders => { console.log('got data using effect', orders); return multiply() }),
        tap(x => console.log('effect executed', x)),
        catchError(() => EMPTY)
      ))
  ));

  constructor(private actions$: Actions, private mtService: MtService) { }
}
