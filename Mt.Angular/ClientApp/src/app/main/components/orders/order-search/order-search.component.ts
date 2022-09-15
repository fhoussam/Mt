import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';
import { loadOrdersBegin } from '../../../reducers/orders-actions';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  orderSearch = new OrderSearch();
  count$: Observable<number>;

  triggerSearch() {
    this.orderSearch.shipCountry = "France";
    this.store.dispatch(loadOrdersBegin({ orderSearch: this.orderSearch }));
  }

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerReset() {
    this.orderSearch = new OrderSearch();
    //this.reset.emit();
  }
}
