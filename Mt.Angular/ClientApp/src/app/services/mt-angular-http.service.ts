import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailModel } from '../models/customer-detail-model';
import { CustomerEditModel } from '../models/customer-edit-model';
import { CustomerListModel } from '../models/customer-list-model';
import { CustomerOrderListModel } from '../models/customer-order-list-model';
import { CustomerSearch } from '../models/customer-search-model';
import { PagedList } from '../models/PagedList';

@Injectable({
  providedIn: 'root'
})
export class MtAngularHttpService {

  constructor(private http: HttpClient) { }
  static baseUrl = "https://localhost:5002/";
  fullUrl(path: string) {
    return MtAngularHttpService.baseUrl + path;
  }

  getCustomers(pageIndex: number, pageSize: number, customerSearch: CustomerSearch, sortField?: string, desc?: boolean): Observable<PagedList<CustomerListModel>> {
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

    return this.http.get<PagedList<CustomerListModel>>(this.fullUrl(url));
  }

  getCustomerById(id: string): Observable<CustomerDetailModel> {
    return this.http.get<CustomerDetailModel>(this.fullUrl("customers/" + id));
  }

  getCustomerByIdForEdit(id: string): Observable<CustomerEditModel> {
    return this.http.get<CustomerEditModel>(this.fullUrl("customers/" + id + "/edit"));
  }

  editCustomer(id: string, editValues: CustomerEditModel): any {
    let path = "customers";
    if (id) path += "/" + id;
    return this.http.post(this.fullUrl(path), editValues);
  }

  getCustomerOrders(id: string): Observable<CustomerOrderListModel[]> {
    return this.http.get<CustomerOrderListModel[]>(this.fullUrl("orders/" + id));
  }

  deleteCustomerOrder(customerId: string, orderId: number): Observable<void> {
    return this.http.delete<void>(this.fullUrl("orders/" + customerId + "/" + orderId));
  }
}
