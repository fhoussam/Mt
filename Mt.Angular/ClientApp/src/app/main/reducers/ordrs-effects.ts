import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY, EmptyError } from "rxjs";
import { catchError, exhaustMap, map, tap, mergeMap } from "rxjs/operators";
import { OrderSearch } from "../models/order-search"; 
import { MtService } from "../services/mt-angular-http.service";
import { decrement, increment } from "./orders-actions";

@Injectable()
export class OrdersEffects {

  loadOrders$ = createEffect(() => this.actions$.pipe(
    tap(x => console.log('effect triggered')),
    ofType(increment),
    mergeMap(() => this.mtService.getOrders(0, 10, new OrderSearch())
      .pipe(
        map(movies => decrement()),
        catchError(() => EMPTY)
      ))
  ));

  constructor(private actions$: Actions, private mtService: MtService) { }
}
