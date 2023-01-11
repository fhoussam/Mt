import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PagerSetting } from '../../../../shared/models/PagerSetting';
import { OrderListItem } from '../../../models/order-list-item';
import { OrderSearch } from '../../../models/order-search';
import { OrderTabMenu } from '../../../models/order-tab-menu';
import { OrderState } from '../../../reducers/orders/orders-reducer';
import { MtService } from '../../../services/mt-angular-http.service';
import { OrderEditComponent } from '../order-edit/order-edit.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: OrderListItem[];
  selectedId: number;
  editMode: boolean = true;
  addModalActive = false;
  totalCount: number;
  sortField: string;
  desc: boolean = false;
  pagerSetting: PagerSetting;
  orderSearch = new OrderSearch();
  collapsed: boolean = false;
  orderTabMenu = new OrderTabMenu();
  @ViewChild('editComponent') editComponent: OrderEditComponent;

  constructor(
    private mtAngularHttpService: MtService,
    private renderer: Renderer2,
    private store: Store<{ orders: OrderState }>
  ) { }

  ngOnInit() {
    this.pagerSetting = new PagerSetting();
    this.reload();
    var aa = this.store.select('orders');
    aa.subscribe((x: OrderState) => {
      this.orders = x?.orderSearchResult?.content;
      console.log('subbed', x?.orderSearchResult?.content);
    })
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

    this.reload();
  }

  reload() {
    this.mtAngularHttpService.getOrders(this.pagerSetting.pageIndex, this.pagerSetting.pageSize, this.orderSearch, this.sortField, this.desc).subscribe(x => {
      this.orders = x.content;
      this.totalCount = x.totalCount;
      this.selectedId = this.orders[0].id;
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

    this.reload();
  }

  search(orderSearch: OrderSearch) {
    this.orderSearch = orderSearch;
    this.reload();
  }

  reset() {

  }

  toggleSearchAreaOpen() {
    this.collapsed = !this.collapsed;
  }
}
