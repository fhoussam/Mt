import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { PagerComponent } from './components/pager/pager.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CanDeactivateGuard } from './guards/can-deactivate';

@NgModule({
  exports: [
    NavMenuComponent,
    ModalComponent,
    PagerComponent,
    ConfirmationComponent,
    ForbiddenComponent,
    FormsModule,
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
  ],
  providers: [CanDeactivateGuard]
})
export class SharedModule { }
