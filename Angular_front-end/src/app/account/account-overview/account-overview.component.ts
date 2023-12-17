import { Component } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { AccountComponent } from '../account.component';
import { SharedService } from 'src/app/shared.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})



export class AccountOverviewComponent {
  currentAccount: any = null;

  constructor(public login: LoginService, public service: SharedService) {
    this.fillAccount();
  }

  fillAccount() {
    const accountIdString = this.login.getAccountId();
    const accountIdNumber = parseInt(accountIdString, 10);

    this.service.getLoggedInAccount(accountIdNumber).subscribe(
      data => {
        this.currentAccount = data;
      },
      error => {
        console.error('Error fetching account data:', error);
      }
    );
  }
}
