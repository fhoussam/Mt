import { Component, OnInit } from '@angular/core';
import { CustomerDetailModel } from '../../../models/customer-detail-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customer-display',
    templateUrl: './customer-display.component.html',
    styleUrls: ['./customer-display.component.css']
})
export class CustomerDisplayComponent implements OnInit {

    constructor(private customerService: CustomerService) { }
    customer: CustomerDetailModel 

    ngOnInit() {
        this.customerService.getCustomerById("ALFKI").subscribe(x => this.customer = x);
    }

}
