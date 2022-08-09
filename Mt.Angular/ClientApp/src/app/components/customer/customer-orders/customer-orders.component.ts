import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomerOrderListModel } from '../../../models/customer-order-list-model';
import { MtAngularHttpService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnChanges {

  @Input() id: string;
  orders: CustomerOrderListModel[] = [];

  constructor(private http: MtAngularHttpService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  load() {
    this.http.getCustomerOrders(this.id).subscribe(x => {
      this.orders = x;
    });
  }
}
