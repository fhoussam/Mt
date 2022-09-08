import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CustomersListComponent } from './components/customer/customers-list/customers-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerDisplayComponent } from './components/customer/customer-display/customer-display.component';
import { InitLoadService } from './services/init-load.service';
import { ModalComponent } from './components/shared/modal/modal.component';
import { PagerComponent } from './components/shared/pager/pager.component';
import { CustomerSearchComponent } from './components/customer/customer-search/customer-search.component';
import { CustomerOrdersComponent } from './components/customer/customer-orders/customer-orders.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';

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
