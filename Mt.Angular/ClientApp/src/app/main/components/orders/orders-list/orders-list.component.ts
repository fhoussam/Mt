import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PagerSetting } from '../../../../shared/models/PagerSetting';
import { OrderListItem } from '../../../models/order-list-item';
import { OrderSearchQuery } from '../../../models/order-search';
import { OrderTabMenu } from '../../../models/order-tab-menu';
import { MtService } from '../../../services/mt-angular-http.service';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import { IOrderState } from '../order-reducer/order-reducer';
import * as OrderSelectors from '../order-reducer/order-selectors';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: OrderListItem[] = [];
  selectedId: number;
  editMode: boolean = true;
  addModalActive = false;
  totalCount: number;
  sortField: string;
  desc: boolean = false;
  pagerSetting: PagerSetting;
  orderSearch = new OrderSearchQuery();
  collapsed: boolean = false;
  orderTabMenu = new OrderTabMenu();
  @ViewChild('editComponent') editComponent: OrderEditComponent;

  constructor(
    private renderer: Renderer2,
    private store: Store
  ) { }

  ngOnInit() {

    this.store.select(OrderSelectors.selectOrders)
      .subscribe(x => {
        console.log('from receiving component')
        console.log(x);
        let tmp: any = x;
        //this.orders = tmp.prop1.orders;
      });

    this.pagerSetting = new PagerSetting();
    //this.reload();
  }

  reset() {
  }

  CanDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //let jsonPreviousState = JSON.stringify(this.editComponent.previousState);
    //let jsonFormState = JSON.stringify(this.editComponent.editForm.value);
    //let isDirty = jsonPreviousState !== jsonFormState;

    //if (isDirty) {
    //  let userConfirmation = confirm('Do you want to discard the changes ?');
    //  return userConfirmation;
    //}

    //else
      return true;
  }

  setSortField(sortField: string) {

    if (sortField === this.sortField) {
      this.desc = !this.desc;
    }
    else {
      this.sortField = sortField;
    }

    //this.reload();
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

  selectOrder(selectedId: number) {
    this.selectedId = selectedId;
  }

  setEditMode(activated: boolean) {
    this.editMode = activated;
  }

  onChangePagerSettings(pagerSetting: any) {

    if (pagerSetting.pageSize === undefined)
      pagerSetting.pageSize = 5;

    this.pagerSetting = pagerSetting;

    //this.reload();
  }

  search(orderSearch: OrderSearchQuery) {
    this.orderSearch = orderSearch;
    //this.reload();
  }

  toggleSearchAreaOpen() {
    this.collapsed = !this.collapsed;
  }
}
