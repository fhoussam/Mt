import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagerSetting } from '../../shared/models/PagerSetting';
import { CustomerDetail } from '../models/customer-detail';
import { CustomerEdit } from '../models/customer-edit';
import { CustomerListItem } from '../models/customer-list-item';
import { CustomerOrderListItem } from '../models/customer-order-list-item';
import { CustomerSearch } from '../models/customer-search';
import { OrderEdit } from '../models/order-edit';
import { OrderListItem } from '../models/order-list-item';
import { OrderSearch } from '../models/order-search';
import { PagedList } from '../models/PagedList';
import { SortSetting } from '../models/SortSetting';

@Injectable({
  providedIn: 'root'
})
export class MtService {

  constructor(private http: HttpClient) { }
  static baseUrl = "api/";
  fullUrl(path: string) {
    return MtService.baseUrl + path;
  }

  objectToParams(obj: any): string {
    let params = "";
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key]) {
        params += key + "=" + obj[key] + "&";
      }
    }
    return params.slice(0, -1);
  }

  getCustomers(pageIndex: number, pageSize: number, customerSearch: CustomerSearch, sortField?: string, desc?: boolean): Observable<PagedList<CustomerListItem>> {
    let url = "customers?PageIndex=" + pageIndex + "&PageSize=" + pageSize + "&SortField=" + sortField;

    if (desc != null)
      url += "&Desc=" + desc;

    var getParam = this.objectToParams(customerSearch);
    url += "&" + getParam;
    return this.http.get<PagedList<CustomerListItem>>(this.fullUrl(url));
  }

  getOrders(orderSearch: OrderSearch, sortSetting: SortSetting, pagerSetting: PagerSetting): Observable<PagedList<OrderListItem>> {
    var url = "orders?"
      + this.objectToParams(orderSearch) + "&"
      + this.objectToParams(pagerSetting) + "&"
      + this.objectToParams(sortSetting);

    return this.http.get<PagedList<OrderListItem>>(this.fullUrl(url));
  }

  getCustomerById(id: string): Observable<CustomerDetail> {
    return this.http.get<CustomerDetail>(this.fullUrl("customers/" + id));
  }

  getCustomerByIdForEdit(id: string): Observable<CustomerEdit> {
    return this.http.get<CustomerEdit>(this.fullUrl("customers/" + id + "/edit"));
  }

  getOrderByIdForEdit(id: number): Observable<OrderEdit> {
    return this.http.get<OrderEdit>(this.fullUrl("orders/" + id + "/edit"));
  }

  editCustomer(id: string, editValues: CustomerEdit): any {
    let path = "customers";
    if (id) path += "/" + id;
    return this.http.post(this.fullUrl(path), editValues);
  }

  editOrder(id: number, editValues: OrderEdit): any {
    let path = "orders";
    if (id) path += "/" + id;
    return this.http.post(this.fullUrl(path), editValues);
  }

  getCustomerOrders(id: string): Observable<CustomerOrderListItem[]> {
    return this.http.get<CustomerOrderListItem[]>(this.fullUrl("orders/" + id));
  }

  deleteCustomerOrder(customerId: string, orderId: number): Observable<void> {
    return this.http.delete<void>(this.fullUrl("orders/" + customerId + "/" + orderId));
  }
}
