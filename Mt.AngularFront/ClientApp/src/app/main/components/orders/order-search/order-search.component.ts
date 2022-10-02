import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearchQuery } from '../../../models/order-search';
import * as OrderActions from '../order-reducer/order-actions';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[] = [];
  orderSearch = new OrderSearchQuery();

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    this.store.dispatch(OrderActions.getOrdersBegin({
      searchQuery: {
        shipCountry: this.orderSearch.shipCountry,
        customerId: this.orderSearch.customerId,
        from: this.orderSearch.from,
        to: this.orderSearch.to,
        pageIndex: this.orderSearch.pageIndex,
        pageSize: this.orderSearch.pageSize,
        desc: this.orderSearch.desc,
        sortField: this.orderSearch.sortField
      }
    }));
  }

  triggerReset() {
    this.orderSearch = new OrderSearchQuery();
  }
}
