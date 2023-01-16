import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './main/components/home/home.component';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ordersReducer } from './main/reducers/orders/orders-reducer';
import { OrdersEffects } from './main/reducers/orders/orders-effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MainModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    StoreModule.forRoot({ orders: ordersReducer }),
    EffectsModule.forRoot([OrdersEffects]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
