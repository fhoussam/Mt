import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { CustomerEdit } from '../../../models/customer-edit';
import { MtService } from '../../../services/mt.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnChanges, OnInit {

  constructor(private customerService: MtService) { }

  previousState = new CustomerEdit();
  cities: string[] = [];
  countries: string[] = [];
  @Input() id = "";
  @Output() Cancel = new EventEmitter<void>();
  @Output() Ok = new EventEmitter<void>();
  @ViewChild('f', { static: false }) editForm!: NgForm;

  ngOnInit(): void {
    this.cities = APP_SETTINGS.cities;
    this.countries = APP_SETTINGS.countries;
    setTimeout(() => this.setFormExampleValues(), 10);
  }

  cancelEdit() {
    this.Cancel.emit();
  }

  setFormExampleValues(): void {
    if (this.id === undefined) {
      var formValue = new CustomerEdit();
      formValue.city = "Lyon";
      formValue.companyName = "My Company";
      formValue.contactName = "My Contact Name";
      formValue.country = "France";
      formValue.customerId = "FDZEA";
      formValue.postalCode = "DF-874";
      this.editForm.form.setValue(formValue);
    }
  }

  ngOnChanges() {
    if (this.id) {
      this.customerService.getCustomerByIdForEdit(this.id).subscribe(x => {
        this.editForm.reset();
        this.editForm.form.patchValue(x);
        this.previousState = x;
      });
    }
  }

  editCustomer() {
    let customer = new CustomerEdit();
    Object.assign(customer, this.editForm.value);
    this.customerService.editCustomer(this.id, customer).subscribe((x: any) => {
      this.Ok.emit();
      console.log("customer data saved");
    });
  }
}
