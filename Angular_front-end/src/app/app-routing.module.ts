import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { ShowAccountComponent } from './account/show-account/show-account.component';
import { AccountOverviewComponent } from './account/account-overview/account-overview.component';
import { RegisterComponent } from './account/register/register.component';


const routes: Routes = [
  {path:'account-test', component:ShowAccountComponent},
  {path:'home', component:AccountComponent},
  {path:'account-overview', component:AccountOverviewComponent},
  {path:'register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
