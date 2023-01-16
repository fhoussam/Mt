import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';
import { AppState } from '../../../reducers/AppState';
import { searchOrdersBeginAction } from '../../../reducers/orders/orders-actions';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch = new OrderSearch();
  @ViewChild('f', { static: false }) editForm: NgForm;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    this.customerSearch = this.editForm.value;
    this.store.dispatch(searchOrdersBeginAction(this.customerSearch));
  }

  triggerReset() {
    this.customerSearch = new OrderSearch();
    this.store.dispatch(searchOrdersBeginAction(this.customerSearch));
  }
}
