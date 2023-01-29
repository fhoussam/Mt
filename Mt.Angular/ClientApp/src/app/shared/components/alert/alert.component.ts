import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiEndInteractionAction } from '../../reducers/api-query/api-query-actions';
import { apiQueryStateSelector } from '../../reducers/api-query/api-query-selectors';
import { AppRootState } from '../../reducers/AppRootState';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerType: string = "success";
  displayed: boolean = false;
  loading: boolean = false;
  message: string = "";
  successMessage: string = "Operation went successful";
  failMessage: string = "Something went wrong";

  constructor(private store: Store<AppRootState>) { }

  ngOnInit(): void {
    this.store.select(apiQueryStateSelector).subscribe(x => {

      if (x.apiResponseError || x.apiResponseOk) {
        this.displayed = true;
        if ((x.apiQueryPending && x.apiResponseError)
          || (x.apiQueryPending && x.apiResponseOk)
          || (x.apiResponseError && x.apiResponseOk)) {
          this.alerType = "warning";
        }
        if (x.apiResponseOk) {
          this.alerType = "success";
          this.message = this.successMessage;
          setTimeout(() => {
            this.dismiss();
          }, 1500);
        }
        if (x.apiResponseError) {
          this.alerType = "danger";
          this.message = this.failMessage;
        }
      }
      else {
        this.displayed = false;
      }

      this.loading = x.apiQueryPending;
    });
  }

  dismiss() {
    this.store.dispatch(ApiEndInteractionAction());
  }
}
