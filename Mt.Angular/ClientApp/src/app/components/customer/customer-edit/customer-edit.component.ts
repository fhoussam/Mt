import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CustomerEditModel } from '../../../models/customer-edit-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnChanges {

    constructor(private customerService: CustomerService) { }
    customer: CustomerEditModel;
    @Input() id: string;
    @Output() onCancelEdit = new EventEmitter<void>();

    ngOnChanges() {
        this.customerService.getCustomerByIdForEdit(this.id).subscribe(x => this.customer = x);
    }

    editCustomer() {
        this.customerService.editCustomer(this.id, this.customer).subscribe(x=> console.log("customer data saved"));
    }

    cancelEdit() {
        this.onCancelEdit.emit();
    }
}
