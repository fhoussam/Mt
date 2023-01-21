import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, of, Subscription, switchMap, delay } from 'rxjs';
import { APP_SETTINGS } from '../../../models/APP_SETTINGS';
import { OrderEdit } from '../../../models/order-edit';
import { AppState } from '../../../reducers/AppState';
import { updateOrderBeginAction } from '../../../reducers/orders/orders-actions';
import { orderForEditSelector } from '../../../reducers/orders/orders-selectors';
import { MtService } from '../../../services/mt-angular-http.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>, private mtService: MtService) { }

  previousState: OrderEdit;
  countries: string[];
  id: number = 10248;
  editForm: FormGroup;
  orderForEditSubscription$: Subscription;

  ngOnInit(): void {
    this.countries = APP_SETTINGS.countries;
    this.orderForEditSubscription$ = this.store.select(orderForEditSelector).subscribe(x => {
      this.initForm(x);
    });
  }

  saveChanges() {
    let formValue: OrderEdit = this.getDeserializedFormGroupValue();
    this.store.dispatch(updateOrderBeginAction(this.id, formValue));
  }

  getDeserializedFormGroupValue(): OrderEdit {
    let formValue = new OrderEdit();

    let parsedOrderDate = new Date(this?.editForm?.get('orderDate')?.value);
    console.log(parsedOrderDate);

    formValue.contactName = this?.editForm?.get('contactName')?.value;
    formValue.customerId = this?.editForm?.get('customerId')?.value;
    formValue.employeeId = this?.editForm?.get('employeeId')?.value;
    formValue.orderDate = this?.editForm?.get('orderDate')?.value;
    formValue.shipAddress = this?.editForm?.get('shipAddress')?.value;
    formValue.shipCountry = this?.editForm?.get('shipCountry')?.value;

    return formValue;
  }

  initForm(x: OrderEdit) {
    this.editForm = new FormGroup({
      employeeId: new FormControl(x.employeeId, [Validators.required]),
      customerId: new FormControl(x.customerId),
      orderDate: new FormControl(x.orderDate),
      shipCountry: new FormControl(x.shipCountry, [Validators.required], [this.isCountryInEu()]),
      shipAddress: new FormControl(x.shipAddress, [Validators.required, this.isLengthEvenNumber]),
    });
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
