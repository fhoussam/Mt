import { Component, OnInit, Renderer2 } from '@angular/core';
import { PagerSetting } from '../../../../shared/models/PagerSetting';
import { CustomerListModel } from '../../../models/customer-list-model';
import { CustomerSearch } from '../../../models/customer-search-model';
import { CustomerTabMenu } from '../../../models/customer-tab-menu';
import { MtAngularHttpService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  constructor(private customerService: MtAngularHttpService, private renderer: Renderer2) { }

  customers: CustomerListModel[];
  selectedId: string = "";
  editMode: boolean = true;
  addModalTitle = "New Customer";
  addModalActive = false;
  totalCount: number;
  sortField: string;
  desc: boolean = false;
  pagerSetting: PagerSetting;
  customerSearch = new CustomerSearch();
  collapsed: boolean = true;
  customerTabMenu = new CustomerTabMenu();

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
    this.customerService.getCustomers(this.pagerSetting.pageIndex, this.pagerSetting.pageSize, this.customerSearch, this.sortField, this.desc).subscribe(x => {
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
