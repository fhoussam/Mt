import { Component, OnInit } from '@angular/core';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../../../reducers/orders-actions';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch = new OrderSearch();
  count$: Observable<number>;

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    //this.search.emit(this.customerSearch);
    this.increment();
  }

  triggerReset() {
    this.customerSearch = new OrderSearch();
    //this.reset.emit();
  }
}
