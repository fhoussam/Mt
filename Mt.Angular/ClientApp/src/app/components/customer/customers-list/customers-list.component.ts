import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CustomerListModel } from '../../../models/customer-list-model';
import { PagerSetting } from '../../../models/PagerSetting';
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
    totalCount: number;
    sortField: string;
    desc: boolean = false;
    pagerSetting: PagerSetting;

    ngOnInit() {
        this.pagerSetting = new PagerSetting();
        this.reload();
    }

    setSortField(sortField: string) {

        if (sortField === this.sortField) {
            this.desc = !this.desc;
        }
        else {
            this.sortField = sortField;
        }
        
        this.reload();
    }

    reload() {
        this.customerService.getCustomers(this.pagerSetting.pageIndex, this.pagerSetting.pageSize, this.sortField, this.desc).subscribe(x => {
            this.customers = x.content;
            this.totalCount = x.totalCount;
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

    onChangePagerSettings(pagerSetting: PagerSetting) {
        
        if (pagerSetting.pageSize === undefined)
            pagerSetting.pageSize = 5;

        this.pagerSetting = pagerSetting;

        this.reload();
    }
}
