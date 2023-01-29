import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { PagerComponent } from './components/pager/pager.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CanDeactivateGuard } from './guards/can-deactivate';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { apiQueryReducer } from './reducers/api-query/api-query-reducer';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiQueryInterceptor } from './api-query-interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  exports: [
    NavMenuComponent,
    ModalComponent,
    PagerComponent,
    ConfirmationComponent,
    ForbiddenComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    BrowserAnimationsModule,
    AlertComponent,
    TranslateModule,
    CommonModule
  ],
  declarations: [
    NavMenuComponent,
    ModalComponent,
    PagerComponent,
    ConfirmationComponent,
    ForbiddenComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BsDatepickerModule.forRoot(),
    StoreModule.forRoot({ apiQuery: apiQueryReducer }),
    BrowserAnimationsModule
  ],
  providers: [
    CanDeactivateGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ApiQueryInterceptor, multi: true },
  ]
})
export class SharedModule { }
