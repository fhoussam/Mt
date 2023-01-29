import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';
import { AppFeatureState } from '../../../reducers/AppFeatureState';
import { searchOrdersBeginAction } from '../../../reducers/orders/orders-actions';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch: OrderSearch;
  @ViewChild('f', { static: false }) editForm: NgForm;

  constructor(private store: Store<AppFeatureState>, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
    this.triggerReset();
  }

  triggerSearch() {
    this.customerSearch = new OrderSearch();
    this.customerSearch.customerId = this.editForm.value["customerId"];
    this.customerSearch.shipCountry = this.editForm.value["shipCountry"];
    this.customerSearch.from = new Date(this.editForm.value["from"]);
    this.customerSearch.to = new Date(this.editForm.value["to"]);
    this.store.dispatch(searchOrdersBeginAction(this.customerSearch));
  }

  triggerReset() {
    this.customerSearch = new OrderSearch();
    this.store.dispatch(searchOrdersBeginAction(this.customerSearch));
  }
}
