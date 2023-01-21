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
    BrowserAnimationsModule
  ],
  providers: [CanDeactivateGuard]
})
export class SharedModule { }
