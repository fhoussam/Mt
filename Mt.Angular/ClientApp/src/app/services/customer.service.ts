import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerListModel } from '../models/customer-list-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<CustomerListModel[]>
    {
        return this.http.get<CustomerListModel[]>("https://localhost:5002/customers");
    }
}
