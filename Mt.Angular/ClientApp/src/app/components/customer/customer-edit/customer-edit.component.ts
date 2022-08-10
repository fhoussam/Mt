import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { CustomerEditModel } from '../../../models/customer-edit-model';
import { MtAngularHttpService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnChanges, OnInit, AfterViewInit {

  constructor(private customerService: MtAngularHttpService) { }

  previousState: CustomerEditModel;
  cities: string[];
  countries: string[];
  @Input() id: string;
  @Output() Cancel = new EventEmitter<void>();
  @Output() Ok = new EventEmitter<void>();
  @ViewChild('f', { static: false }) editForm: NgForm;

  ngAfterViewInit(): void {
    console.log(this.editForm.setValue(new CustomerEditModel()));
  }

  ngOnInit(): void {
    this.cities = APP_SETTINGS.cities;
    this.countries = APP_SETTINGS.countries;
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
    let customer = new CustomerEditModel();
    Object.assign(customer, this.editForm.value);
    this.customerService.editCustomer(this.id, customer).subscribe((x: any) => {
      this.Ok.emit();
      console.log("customer data saved");
    });
  }

  cancelEdit() {
    //this.Cancel.emit();
    console.log(this.editForm);
  }
}
