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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiQueryInterceptor } from './api-query-interceptor';

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
    BrowserAnimationsModule
  ],
  declarations: [
    NavMenuComponent,
    ModalComponent,
    PagerComponent,
    ConfirmationComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
