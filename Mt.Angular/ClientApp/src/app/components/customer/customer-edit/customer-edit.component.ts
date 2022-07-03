import { Component, OnInit } from '@angular/core';
import { CustomerEditModel } from '../../../models/customer-edit-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

    constructor(private customerService: CustomerService) { }
    customer: CustomerEditModel;
    id = "VICTE";

    ngOnInit() {
        this.customerService.getCustomerByIdForEdit(this.id).subscribe(x => this.customer = x);
    }

    editCustomer() {
        this.customerService.editCustomer(this.id, this.customer).subscribe(x=> console.log("customer data saved"));
    }
}
