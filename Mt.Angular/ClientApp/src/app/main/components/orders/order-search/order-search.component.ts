import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';
import { searchOrdersBeginAction } from '../../../reducers/orders/orders-actions';
import { OrderState } from '../../../reducers/orders/orders-reducer';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch = new OrderSearch();

  constructor(private store: Store<{ orders: OrderState }>) {}

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    var defaultSearch = new OrderSearch();
    defaultSearch.shipCountry = "France";
    this.store.dispatch(searchOrdersBeginAction(defaultSearch));
  }

  triggerReset() {
    this.customerSearch = new OrderSearch();

  }
}
