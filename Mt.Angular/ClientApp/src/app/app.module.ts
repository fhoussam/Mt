import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerDisplayComponent } from './main/components/customer/customer-display/customer-display.component';
import { CustomerEditComponent } from './main/components/customer/customer-edit/customer-edit.component';
import { CustomerOrdersComponent } from './main/components/customer/customer-orders/customer-orders.component';
import { CustomerSearchComponent } from './main/components/customer/customer-search/customer-search.component';
import { CustomersListComponent } from './main/components/customer/customers-list/customers-list.component';
import { HomeComponent } from './main/components/home/home.component';
import { OrdersListComponent } from './main/components/orders/orders-list/orders-list.component';
import { InitLoadService } from './main/services/init-load.service';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { PagerComponent } from './shared/components/pager/pager.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

export function get_settings(initLoadService: InitLoadService) {
  return () => initLoadService.getSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CustomersListComponent,
    CustomerEditComponent,
    CustomerDisplayComponent,
    ModalComponent,
    PagerComponent,
    CustomerSearchComponent,
    CustomerOrdersComponent,
    ConfirmationComponent,
    OrdersListComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'customers', canActivate: [AuthGuardService], component: CustomersListComponent },
      { path: 'orders', canActivate: [AuthGuardService], component: OrdersListComponent },
      { path: 'forbidden', component: ForbiddenComponent },
    ])
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [InitLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
