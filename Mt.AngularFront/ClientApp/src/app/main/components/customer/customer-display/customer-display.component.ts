import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CustomerDetail } from '../../../models/customer-detail';
import { MtService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.css']
})
export class CustomerDisplayComponent implements OnChanges {

  constructor(private customerService: MtService) { }
  customer = new CustomerDetail();
  @Input() id = "";
  @Output() onActivateEditMode = new EventEmitter<void>();

  ngOnChanges() {
    this.customerService.getCustomerById(this.id).subscribe(x => this.customer = x);
  }

  activateEditMode() {
    this.onActivateEditMode.emit();
  }
}
