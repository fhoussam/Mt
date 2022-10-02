import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPagerSetting } from '../../../../shared/models/PagerSetting';
import { OrderListItem } from '../../../models/order-list-item';
import { OrderSearchQuery } from '../../../models/order-search';
import { OrderTabMenu } from '../../../models/order-tab-menu';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import { IAppStateInterface } from '../order-reducer/order-reducer';
import * as OrderSelectors from '../order-reducer/order-selectors';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: OrderListItem[] = [];
  selectedId = 0;
  editMode: boolean = true;
  addModalActive = false;
  totalCount = 0;
  sortField = "";
  desc: boolean = false;
  searchQuery = new OrderSearchQuery();
  collapsed: boolean = false;
  orderTabMenu = new OrderTabMenu();
  @ViewChild('editComponent') editComponent!: OrderEditComponent;

  constructor(
    private renderer: Renderer2,
    private store: Store<IAppStateInterface>
  ) { }

  ngOnInit() { 
    this.store.pipe(select(OrderSelectors.selectOrderQueryResult)).subscribe(x => {
      this.orders = x.content;
      console.log("order list component received data", x.content);
    });
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

  onChangePagerSettings(pagerSetting: IPagerSetting) {

    if (pagerSetting.pageSize === undefined)
      pagerSetting.pageSize = 5;

    this.searchQuery.pageIndex = pagerSetting.pageIndex;
    this.searchQuery.pageSize = pagerSetting.pageSize;

    //this.reload();
  }

  search(orderSearch: OrderSearchQuery) {
    this.searchQuery = orderSearch;
    //this.reload();
  }

  toggleSearchAreaOpen() {
    this.collapsed = !this.collapsed;
  }
}
