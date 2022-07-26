import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailModel } from '../models/customer-detail-model';
import { CustomerEditModel } from '../models/customer-edit-model';
import { CustomerListModel } from '../models/customer-list-model';
import { PagedList } from '../models/PagedList';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }
    static baseUrl = "https://localhost:5002/";
    fullUrl(path: string) {
        return CustomerService.baseUrl + path;
    }

    getCustomers(pageIndex: number, pageSize: number): Observable<PagedList<CustomerListModel>> {
        return this.http.get<PagedList<CustomerListModel>>(this.fullUrl("customers?PageIndex=" + pageIndex + "&PageSize=" + pageSize));
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
}
