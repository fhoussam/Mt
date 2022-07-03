import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CustomerDetailModel } from '../../../models/customer-detail-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customer-display',
    templateUrl: './customer-display.component.html',
    styleUrls: ['./customer-display.component.css']
})
export class CustomerDisplayComponent implements OnChanges {

    constructor(private customerService: CustomerService) { }
    customer: CustomerDetailModel
    @Input() id: string;
    @Output() onActivateEditMode = new EventEmitter<void>();

    ngOnChanges() {
        this.customerService.getCustomerById(this.id).subscribe(x => this.customer = x);
    }

    activateEditMode() {
        this.onActivateEditMode.emit();
    }
}
