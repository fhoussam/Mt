import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailModel } from '../models/customer-detail-model';
import { CustomerEditModel } from '../models/customer-edit-model';
import { CustomerListModel } from '../models/customer-list-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<CustomerListModel[]> {
        return this.http.get<CustomerListModel[]>("https://localhost:5002/customers");
    }

    getCustomerById(id: string): Observable<CustomerDetailModel> {
        return this.http.get<CustomerDetailModel>("https://localhost:5002/customers/" + id);
    }

    getCustomerByIdForEdit(id: string): Observable<CustomerEditModel> {
        return this.http.get<CustomerEditModel>("https://localhost:5002/customers/" + id + "/edit");
    }

    editCustomer(id: string, editValues: CustomerEditModel): any {
        return this.http.post("https://localhost:5002/customers/" + id, editValues);
    }
}
