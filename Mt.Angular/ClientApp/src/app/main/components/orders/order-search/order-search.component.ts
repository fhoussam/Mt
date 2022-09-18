import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';
import { increment } from '../../../reducers/orders/orders-actions';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch = new OrderSearch();

  constructor(private store: Store<{ count: number }>) {}

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    //this.search.emit(this.customerSearch);
    this.store.dispatch(increment());
  }

  triggerReset() {
    this.customerSearch = new OrderSearch();
    //this.reset.emit();
  }
}
