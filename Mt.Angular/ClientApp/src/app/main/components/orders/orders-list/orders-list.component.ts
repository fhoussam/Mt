import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PagerSetting } from '../../../../shared/models/PagerSetting';
import { OrderListItem } from '../../../models/order-list-item';
import { OrderSearch } from '../../../models/order-search';
import { OrderTabMenu } from '../../../models/order-tab-menu';
import { PagedList } from '../../../models/PagedList';
import { SortSetting } from '../../../models/SortSetting';
import { AppFeatureState } from '../../../reducers/AppFeatureState';
import { pageOrdersBeginAction, selectOrderForEditBeginAction, sortOrdersBeginAction } from '../../../reducers/orders/orders-actions';
import { orderSearchResultSelector } from '../../../reducers/orders/orders-selectors';
import { OrderEditComponent } from '../order-edit/order-edit.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {

  totalCount: number;
  orders: OrderListItem[];
  searchResult$: Observable<PagedList<OrderListItem>>;

  selectedId: number;
  searchResultSubscription: Subscription;
  editMode: boolean = true;
  addModalActive = false;
  sortField: string;
  desc: boolean = false;
  pagerSetting: PagerSetting;
  orderSearch = new OrderSearch();
  collapsed: boolean = false;
  orderTabMenu = new OrderTabMenu();
  @ViewChild('editComponent') editComponent: OrderEditComponent;

  constructor(
    private renderer: Renderer2,
    private store: Store<AppFeatureState>
  ) { }

  ngOnInit() {
    this.searchResult$ = this.store.select(orderSearchResultSelector);
    this.searchResultSubscription = this.searchResult$.subscribe(x => {
      if (x?.content != null) {
        this.orders = x?.content;
        this.totalCount = x?.totalCount;
        this.selectedId = x?.content[0].id;
        this.selectOrder(this.selectedId);
      }
    });
  }

  ngOnDestroy(): void {
    this.searchResultSubscription.unsubscribe();
  }

  setSortField(sortField: string) {

    if (sortField === this.sortField) {
      this.desc = !this.desc;
    }
    else {
      this.sortField = sortField;
    }

    let sortSetting = new SortSetting();
    sortSetting.desc = this.desc;
    sortSetting.sortField = this.sortField;
    this.store.dispatch(sortOrdersBeginAction(sortSetting));
  }

  onChangePagerSettings(pagerSetting: any) {

    if (pagerSetting.pageSize === undefined)
      pagerSetting.pageSize = 5;

    this.pagerSetting = pagerSetting;

    this.store.dispatch(pageOrdersBeginAction(this.pagerSetting));
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
    this.store.dispatch(selectOrderForEditBeginAction(selectedId));
  }

  setEditMode(activated: boolean) {
    this.editMode = activated;
  }

  toggleSearchAreaOpen() {
    this.collapsed = !this.collapsed;
  }
}
