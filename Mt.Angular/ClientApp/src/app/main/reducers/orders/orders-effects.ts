import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { MtService } from "../../services/mt-angular-http.service";
import { AppState } from "../AppState";
import { pageOrdersBeginAction, searchOrdersBeginAction, searchOrdersEndAction, selectOrderForEditBeginAction, selectOrderForEditEndAction, sortOrdersBeginAction, updateOrderBeginAction } from "./orders-actions";

@Injectable()
export class OrdersEffects {

  searchOrders$ = createEffect(() => this.actions$.pipe(
    ofType(searchOrdersBeginAction),
    withLatestFrom(this.store),
    tap(([orderSearch, state]) => {
      console.log('effect searchOrders triggered');
      console.log('-- search params : ', orderSearch.orderSearch);
      console.log('-- pager setting : ', state.orders.pageSetting);
    }),
    mergeMap(([action, state]) => this.mtService.getOrders(action.orderSearch, state.orders.sortSetting, state.orders.pageSetting)
      .pipe(
        map(orders => {
          console.log('got data using searchOrders effect', orders);
          return searchOrdersEndAction(orders);
        }),
        catchError(() => EMPTY)
      ))
  ));

  pageOrders$ = createEffect(() => this.actions$.pipe(
    ofType(pageOrdersBeginAction),
    tap(x => console.log('effect pageOrders triggered', x)),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => this.mtService.getOrders(state.orders.orderSearch, state.orders.sortSetting, action.pagerSetting)
      .pipe(
        map(orders => {
          console.log('got data using effect pageOrders', orders);
          return searchOrdersEndAction(orders);
        }),
        catchError(() => EMPTY)
      ))
  ));

  sortOrders$ = createEffect(() => this.actions$.pipe(
    ofType(sortOrdersBeginAction),
    tap(x => console.log('effect pageOrders triggered', x)),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => this.mtService.getOrders(state.orders.orderSearch, action.sortSetting, state.orders.pageSetting)
      .pipe(
        map(orders => {
          console.log('got data using effect pageOrders', orders);
          return searchOrdersEndAction(orders);
        }),
        catchError(() => EMPTY)
      ))
  ));

  selectOrderForEdit$ = createEffect(() => this.actions$.pipe(
    ofType(selectOrderForEditBeginAction),
    tap(x => console.log('effect selectOrderForEdit triggered', x)),
    mergeMap(action => this.mtService.getOrderByIdForEdit(action.id)
      .pipe(
        map(order => {
          console.log('got data using effect selectOrderForEdit', order);
          order.orderId = action.id;
          return selectOrderForEditEndAction(order);
        }),
        catchError(() => EMPTY)
      ))
  ));

  updateOrder = createEffect(() => this.actions$.pipe(
    ofType(updateOrderBeginAction),
    tap(x => console.log('effect updateOrder triggered', x)),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => this.mtService.editOrder(action.id, action.order)
      .pipe(
        map(order => {
          console.log('got data using effect updateOrder', order);
          //no need to update the edit panel as the user have already modified
          //the data and only thing left to update is the list
          //return selectOrderForEditBeginAction(action.id);
          return searchOrdersBeginAction(state.orders.orderSearch);
        }),
        catchError(() => EMPTY)
      ))
  ));

  constructor(private actions$: Actions, private mtService: MtService, private store: Store<AppState>) { }
}
