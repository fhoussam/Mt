import { Component, OnInit } from '@angular/core';
import { CustomerListModel } from '../../../models/customer-list-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

    constructor(private customerService: CustomerService) { }
    customers: CustomerListModel[];
    selectedId: string;
    editMode: boolean = true;
    addModalTitle = "New Customer";
    addModalActive = false;

    ngOnInit() {
        this.customerService.getCustomers().subscribe(x => {
            this.customers = x;
            this.selectedId = this.customers[0].customerId;
        });
    }

    toggleAddModal(active: boolean) {
        this.addModalActive = active;
    }

    selectCustomer(selectedId: string) {
        this.selectedId = selectedId;
    }

    setEditMode(activated:boolean) {
        this.editMode = activated;
    }
}
