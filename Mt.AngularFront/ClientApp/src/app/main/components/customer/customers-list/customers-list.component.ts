import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanCompoDeactivate } from '../../../../shared/guards/can-deactivate';
import { PagerSetting } from '../../../../shared/models/PagerSetting';
import { CustomerListItem } from '../../../models/customer-list-item';
import { CustomerSearch } from '../../../models/customer-search';
import { CustomerTabMenu } from '../../../models/customer-tab-menu';
import { MtService } from '../../../services/mt-angular-http.service';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit, CanCompoDeactivate {

  customers: CustomerListItem[] = [];
  selectedId: string = "";
  editMode: boolean = true;
  addModalTitle = "New Customer";
  addModalActive = false;
  totalCount = 0;
  sortField = "";
  desc: boolean = false;
  pagerSetting: PagerSetting;
  customerSearch = new CustomerSearch();
  collapsed: boolean = true;
  customerTabMenu = new CustomerTabMenu();
  @ViewChild('editComponent') editComponent!: CustomerEditComponent;
  

  constructor(private mtAngularHttpService: MtService, private renderer: Renderer2) { }

  ngOnInit() {
    this.pagerSetting = new PagerSetting();
    this.reload();
  }

  CanDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let jsonPreviousState = JSON.stringify(this.editComponent.previousState);
    let jsonFormState = JSON.stringify(this.editComponent.editForm.value);
    let isDirty = jsonPreviousState !== jsonFormState;

    if (isDirty) {
      let userConfirmation = confirm('Do you want to discard the changes ?');
      return userConfirmation;
    }

    else return true;
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
    this.mtAngularHttpService.getCustomers(this.pagerSetting.pageIndex, this.pagerSetting.pageSize, this.customerSearch, this.sortField, this.desc).subscribe(x => {
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

  setEditMode(activated: boolean) {
    this.editMode = activated;
  }

  onChangePagerSettings(pagerSetting: any) {

    if (pagerSetting.pageSize === undefined)
      pagerSetting.pageSize = 5;

    this.pagerSetting = pagerSetting;

    this.reload();
  }

  search(customerSearch: CustomerSearch) {
    this.customerSearch = customerSearch;
    this.reload();
  }

  reset() {

  }

  toggleSearchAreaOpen() {
    this.collapsed = !this.collapsed;
  }
}
