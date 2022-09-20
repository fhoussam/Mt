import { Component, OnInit } from '@angular/core';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderSearch } from '../../../models/order-search';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  countries: string[];
  customerSearch = new OrderSearch();

  constructor() { }

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
  }

  triggerSearch() {
    console.log("selected ship country", this.customerSearch.shipCountry);
    //this.search.emit(this.customerSearch);
  }

  triggerReset() {
    this.customerSearch = new OrderSearch();
    //this.reset.emit();
  }
}
