import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { ShowAccountComponent } from './account/show-account/show-account.component';
import { AccountOverviewComponent } from './account/account-overview/account-overview.component';
import { AccountPointsComponent } from './account/account-points/account-points.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { AccountPreferencesComponent } from './account/account-preferences/account-preferences.component';
import { AccountOrdersComponent } from './account/account-orders/account-orders.component';
import { RegisterComponent } from './account/register/register.component';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { ShowItemComponent } from './item/show-item/show-item.component';
import { LoginComponent } from './account/login/login.component';
import { ForgotPasswordComponent } from './account/login/forgot-password/forgot-password.component';
import { CheckoutCartComponent } from './account/checkout-cart/checkout-cart.component';
import { ShoppingCartComponent } from './account/shopping-cart/shopping-cart.component';
import { ComplaintsComponent } from "./account/complaints/complaints.component";


const routes: Routes = [
  {path:'account-test', component:ShowAccountComponent},
  {path:'home', component:AccountComponent},
  {path:'account-overview', component:AccountOverviewComponent},
  {path:'register', component:RegisterComponent},
  {path:'item/:id', component: ItemComponent},
  {path:'account-points', component:AccountPointsComponent},
  {path:'account-preferences', component:AccountPreferencesComponent},
  {path:'account-settings', component:AccountSettingsComponent},
  {path:'account-orders', component:AccountOrdersComponent},
  {path:'account-complaints', component: ComplaintsComponent},
  {path:'add-item', component:AddItemComponent},
  {path:'items', component:ShowItemComponent},
  {path:'login', component:LoginComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'shopping-cart', component:ShoppingCartComponent},
  {path:'checkout-cart', component:CheckoutCartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
