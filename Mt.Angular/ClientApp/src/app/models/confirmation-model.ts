import { Observable, of } from "rxjs";

export class ConfirmationModel {
  displayed: boolean;
  message: string;
  action: Observable<void>;

  constructor() {
    this.displayed = false;
    this.action = of();
  }
}
