import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmationModel } from '../models/confirmation-model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  confirmationContext = new BehaviorSubject<ConfirmationModel>(new ConfirmationModel());
  constructor() { }

  display(message: string, action: Observable<void>) {
    let newState = new ConfirmationModel();
    newState.action = action;
    newState.message = message;
    newState.displayed = true;
    this.confirmationContext.next(newState);
  }
}
