import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { CustomerSearch } from '../../../models/customer-search-model';

@Component({
    selector: 'app-customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

    cities: string[];
    countries: string[];
    customerSearch = new CustomerSearch();
    @Output() search = new EventEmitter<CustomerSearch>();
    @Output() reset = new EventEmitter<CustomerSearch>();

    constructor() { }

    ngOnInit(): void {
        this.cities = APP_SETTINGS.cities;
        this.countries = APP_SETTINGS.countries;
    }

    triggerSearch() {
        this.search.emit(this.customerSearch);
    }

    triggerReset() {
        this.customerSearch = new CustomerSearch();
        this.reset.emit();
    }
}
