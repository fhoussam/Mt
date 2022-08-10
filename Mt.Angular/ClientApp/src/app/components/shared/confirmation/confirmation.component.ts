import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfirmationModel } from '../../../models/confirmation-model';
import { ConfirmationService } from '../../../services/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  currentState = new ConfirmationModel();
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.confirmationService.confirmationContext.subscribe(x => {
      this.currentState = x;
    });
  }

  onClose() {
    this.currentState.displayed = false;
  }

  onConfirm() {
    this.currentState.action.subscribe(() => of({}));
  }
}
