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
import { CategoryComponent } from './new-article/category/category.component';
import { ArticleComponent } from './new-article/category/article/article.component';
import { OldArticleComponent } from './old-article/old-article.component';
import { AddEditArticleComponent } from './new-article/add-edit-article/add-edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ShowAccountComponent,
    AddEditAccountComponent,
    RegisterComponent,
    AccountOverviewComponent,
    CategoryComponent,
    ArticleComponent,
    OldArticleComponent,
    AddEditArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
