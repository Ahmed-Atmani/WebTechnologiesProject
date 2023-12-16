import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { ShowAccountComponent } from './account/show-account/show-account.component';
import { AddEditAccountComponent } from './account/add-edit-account/add-edit-account.component';
import { RegisterComponent } from './account/register/register.component';
import { SharedService } from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountOverviewComponent } from './account/account-overview/account-overview.component';

import { ItemComponent } from './item/item.component';

import { AccountPointsComponent } from './account/account-points/account-points.component';
import { AccountPreferencesComponent } from './account/account-preferences/account-preferences.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { AccountOrdersComponent } from './account/account-orders/account-orders.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { LoginComponent } from './account/login/login.component';
import { ForgotPasswordComponent } from './account/login/forgot-password/forgot-password.component';
import { ShowItemComponent } from './item/show-item/show-item.component';
import { ShoppingCartComponent } from './account/shopping-cart/shopping-cart.component';
import { CheckoutCartComponent } from './account/checkout-cart/checkout-cart.component';
import { ComplaintsComponent } from './account/complaints/complaints.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { LocalStorage } from 'ngx-webstorage';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ShowAccountComponent,
    AddEditAccountComponent,
    RegisterComponent,
    AccountOverviewComponent,
    ItemComponent,
    AccountPointsComponent,
    AccountPreferencesComponent,
    AccountSettingsComponent,
    AccountOrdersComponent,
    AddItemComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ShowItemComponent,
    ShoppingCartComponent,
    CheckoutCartComponent,
    ComplaintsComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // LocalStorage,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
