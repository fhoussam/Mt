import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CustomerListModel } from '../../../models/customer-list-model';
import { CustomerService } from '../../../services/customer.service';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

    constructor(private customerService: CustomerService, private renderer: Renderer2) { }
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

    setRowBgColor(el: any) {
        this.renderer.addClass(el, 'tr-hover');
    }

    setBackBgColor(el: any) {
        this.renderer.removeClass(el, 'tr-hover');
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
