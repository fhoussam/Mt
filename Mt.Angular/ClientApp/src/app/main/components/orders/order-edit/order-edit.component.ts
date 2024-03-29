import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { delay, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderEdit } from '../../../models/order-edit';
import { OrderEditUpdate } from '../../../models/order-edit-update';
import { AppFeatureState } from '../../../reducers/AppFeatureState';
import { updateOrderBeginAction } from '../../../reducers/orders/orders-actions';
import { orderForEditSelector } from '../../../reducers/orders/orders-selectors';
import { MtService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppFeatureState>, private mtService: MtService) { }

  previousState: OrderEdit;
  countries: string[];
  id: number = 10248;
  editForm: FormGroup;
  orderForEditSubscription$: Subscription;
  initialEmployeeName: string;
  initialCustomerName: string;

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
    this.orderForEditSubscription$ = this.store.select(orderForEditSelector).subscribe(x => {
      this.initForm(x);
      this.initialEmployeeName = x.employeeName;
      this.initialCustomerName = x.customerName;
    });
  }

  selectEmployeeSuggestion(event: string) {
    this.editForm.get('employeeId')?.setValue(event);
  }

  selectCustomerSuggestion(event: string) {
    this.editForm.get('customerId')?.setValue(event);
  }

  saveChanges() {
    let formValue: OrderEdit = this.getDeserializedFormGroupValue();
    let updateValue = new OrderEditUpdate();
    updateValue.customerId = formValue.customerId;
    updateValue.employeeId = formValue.employeeId;
    updateValue.orderDate = formValue.orderDate;
    updateValue.shipAddress = formValue.shipAddress;
    updateValue.shipCountry = formValue.shipCountry;
    this.store.dispatch(updateOrderBeginAction(formValue.orderId, updateValue));
  }

  getDeserializedFormGroupValue(): OrderEdit {
    let formValue = new OrderEdit();
    formValue.orderId = this?.editForm?.get('orderId')?.value;
    formValue.customerId = this?.editForm?.get('customerId')?.value;
    formValue.employeeId = this?.editForm?.get('employeeId')?.value;
    formValue.orderDate = this?.editForm?.get('orderDate')?.value;
    formValue.shipAddress = this?.editForm?.get('shipAddress')?.value;
    formValue.shipCountry = this?.editForm?.get('shipCountry')?.value;
    return formValue;
  }

  initForm(x: OrderEdit) {
    this.editForm = new FormGroup({
      orderId: new FormControl(x.orderId),
      employeeId: new FormControl(x.employeeId, [Validators.required]),
      customerId: new FormControl(x.customerId),
      orderDate: new FormControl(new Date()),
      shipCountry: new FormControl(x.shipCountry, [Validators.required], [this.isCountryInEu()]),
      shipAddress: new FormControl(x.shipAddress, [Validators.required, this.isLengthEvenNumber]),
    }, { validators: myFormGroupValidator() });
  }

  isCountryInEu(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (!(typeof control.value != 'undefined' && control.value)) return of(null);
      else return of(control.value).pipe(
        delay(1000),
        switchMap((name) => this.mtService.getCountryInEu(control.value).pipe(
          map(inEu => !inEu ? { countryNotInEu: true } : null)
        ))
      );
    };
  };

  isLengthEvenNumber(c: FormControl) {

    //letting 'Required' take charge from here!
    if (c.value === null)
      return null;

    let result: boolean = c.value.length % 2 === 0;
    return result ? null : {
      lengthIsNotEvenNumber: {
        valid: true
      }
    }
  }

  ngOnDestroy(): void {
    this.orderForEditSubscription$.unsubscribe();
  }

  cancelEdit() {

  }
}

function myFormGroupValidator(): ValidatorFn | ValidatorFn[] | null | undefined {
  return (formGroup: AbstractControl) => {
    const shipAddress = formGroup.get("shipAddress")?.value;
    const orderDate = formGroup.get("orderDate")?.value;
    let result = orderDate > new Date() && shipAddress.length >= 20;
    return result ? null : {
      invalidGroup: true
    };
  };
}
