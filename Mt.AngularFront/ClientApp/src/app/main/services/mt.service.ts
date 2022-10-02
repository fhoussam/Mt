import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetail } from '../models/customer-detail';
import { CustomerEdit } from '../models/customer-edit';
import { CustomerListItem } from '../models/customer-list-item';
import { CustomerOrderListItem } from '../models/customer-order-list-item';
import { CustomerSearch } from '../models/customer-search';
import { OrderEdit } from '../models/order-edit';
import { OrderListItem } from '../models/order-list-item';
import { OrderSearchQuery } from '../models/order-search';
import { PagedList } from '../models/PagedList';

@Injectable({
  providedIn: 'root'
})
export class MtService {

  constructor(private http: HttpClient) { }
  static baseUrl = "api/";
  fullUrl(path: string) {
    return MtService.baseUrl + path;
  }

  getCustomers(pageIndex: number, pageSize: number, customerSearch: CustomerSearch, sortField?: string, desc?: boolean): Observable<PagedList<CustomerListItem>> {
    let url = "customers?PageIndex=" + pageIndex + "&PageSize=" + pageSize + "&SortField=" + sortField;

    if (desc != null)
      url += "&Desc=" + desc;

    const isEmptyString = (data: any): boolean => data == '';

    if (customerSearch != null) {

      if (!isEmptyString(customerSearch.city)) {
        url += "&city=" + customerSearch.city;
      }

      if (!isEmptyString(customerSearch.companyName)) {
        url += "&companyName=" + customerSearch.companyName;
      }

      if (!isEmptyString(customerSearch.country)) {
        url += "&country=" + customerSearch.country;
      }

      if (!isEmptyString(customerSearch.customerId)) {
        url += "&customerId=" + customerSearch.customerId;
      }
    }

    return this.http.get<PagedList<CustomerListItem>>(this.fullUrl(url));
  }

  getOrders(orderSearch: OrderSearchQuery): Observable<PagedList<OrderListItem>> {

    const serialize = (obj: any) => {
      return Object.entries(obj)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value + "")}`)
        .join('&');
    }

    let url = "orders?" + serialize(orderSearch);
    console.log(url);
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
