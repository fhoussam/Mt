import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { CustomerEditModel } from '../../../models/customer-edit-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnChanges, OnInit {

    constructor(private customerService: CustomerService) { }
    customer: CustomerEditModel = new CustomerEditModel();
    cities: string[];
    countries: string[];
    @Input() id: string;
    @Output() Cancel = new EventEmitter<void>();
    @Output() Ok = new EventEmitter<void>();

    ngOnInit(): void {
        this.cities = APP_SETTINGS.cities;
        this.countries = APP_SETTINGS.countries;
    }

    ngOnChanges() {
        if (this.id) {
            this.customerService.getCustomerByIdForEdit(this.id).subscribe(x => {
                this.customer = x;
            });
        }
    }

    editCustomer() {
        this.customerService.editCustomer(this.id, this.customer).subscribe(x => {
            this.Ok.emit();
            console.log("customer data saved");
        });
    }

    cancelEdit() {
        this.Cancel.emit();
    }
}
