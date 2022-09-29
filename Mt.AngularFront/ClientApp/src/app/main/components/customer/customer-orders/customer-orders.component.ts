import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConfirmationService } from '../../../../shared/services/confirmation.service';
import { CustomerOrderListItem } from '../../../models/customer-order-list-item';
import { MtService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnChanges {

  @Input() id = "";
  orders: CustomerOrderListItem[] = [];

  constructor(private http: MtService, private confirmationService: ConfirmationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  load() {
    this.http.getCustomerOrders(this.id).subscribe(x => {
      this.orders = x;
    });
  }

  delete(orderId: number) {
    this.confirmationService.display("Sure wanna delete this order ? you might get investigated by the FBI !", this.http.deleteCustomerOrder(this.id, orderId));
  }
}
