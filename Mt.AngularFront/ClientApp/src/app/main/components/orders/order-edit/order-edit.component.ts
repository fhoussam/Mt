import { Component, OnInit } from '@angular/core';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderEdit } from '../../../models/order-edit';
import { MtService } from '../../../services/mt.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  constructor(private mtService: MtService) { }

  previousState = new OrderEdit();
  countries: string[] = [];
  id: number = 10248;

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
    this.initForm();
  }

  initForm()
  {
    this.mtService.getOrderByIdForEdit(10248).subscribe(x => this.previousState = x);
  }

  cancelEdit() {

  }

  editOrder() {
    let order = new OrderEdit();
    //Object.assign(order, this.editForm.value);
    this.mtService.editOrder(this.id, order).subscribe((x: any) => {
      console.log("order data saved");
    });
  }
}
