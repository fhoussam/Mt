import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearchQuery } from '../../../models/order-search';
import * as OrderActions from '../order-reducer/order-actions';
import * as OrderSelectors from '../order-reducer/order-selectors';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch = new OrderSearchQuery();

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(OrderActions.getOrders());
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    this.store.select(OrderSelectors.selectOrders).subscribe(x => console.log("order search query", x));
    console.log("selected ship country", this.customerSearch.shipCountry);
    //this.search.emit(this.customerSearch);
  }

  triggerReset() {
    this.customerSearch = new OrderSearchQuery();
    //this.reset.emit();
  }
}
