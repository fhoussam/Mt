import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CustomersListComponent } from './components/customer/customers-list/customers-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerDisplayComponent } from './components/customer/customer-display/customer-display.component';
import { CustomerSearchComponent } from './components/customer/customer-search/customer-search.component';
import { CustomerOrdersComponent } from './components/customer/customer-orders/customer-orders.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { InitLoadService } from './services/init-load.service';
import { RouterModule } from '@angular/router';
import { ForbiddenComponent } from '../shared/components/forbidden/forbidden.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate';

export function get_settings(initLoadService: InitLoadService) {
  return () => initLoadService.getSettings();
}

@NgModule({
  exports: [
  ],
  declarations: [
    HomeComponent,
    CustomersListComponent,
    CustomerEditComponent,
    CustomerDisplayComponent,
    CustomerSearchComponent,
    CustomerOrdersComponent,
    OrdersListComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forRoot([
      { path: 'customers', canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuardService], component: CustomersListComponent },
      { path: 'orders', canActivate: [AuthGuardService], component: OrdersListComponent },
      { path: 'forbidden', component: ForbiddenComponent },
    ])
  ],
  providers: [
    CanDeactivateGuard,
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [InitLoadService], multi: true }
  ],
})
export class MainModule { }