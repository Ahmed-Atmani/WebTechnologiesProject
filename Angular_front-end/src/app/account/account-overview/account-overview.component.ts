import { Component } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent {
  currentAccount: any = null;
  editedAccount: any = null;
  updatedAccount: any = null;

  constructor(public login: LoginService, public service: SharedService) {
    this.fillAccount();
  }

  ngOnInit(): void {
    this.updatedAccount.AccountId = this.editedAccount.AccountId;
    this.updatedAccount.AccountFirstName = this.editedAccount.AccountFirstName;
    this.updatedAccount.AccountLastName = this.editedAccount.AccountLastName;
    this.updatedAccount.AccountPicture = this.editedAccount.AccountPicture;
    this.updatedAccount.AccountBirthDate = this.editedAccount.AccountBirthDate;
    this.updatedAccount.AccountEmail = this.editedAccount.AccountEmail;
    this.updatedAccount.AccountPassword = this.editedAccount.AccountPassword;
    this.updatedAccount.AccountAddressStreet = this.editedAccount.AccountAddressStreet;
    this.updatedAccount.AccountAddressCity = this.editedAccount.AccountAddressCity;
    this.updatedAccount.AccountAddressCountry = this.editedAccount.AccountAddressCountry;
    this.updatedAccount.AccountAddressStreetNumber = this.editedAccount.AccountAddressStreetNumber;
    this.updatedAccount.AccountAddressPostalCode = this.editedAccount.AccountAddressPostalCode;

  }

  fillAccount() {
    const accountIdString = this.login.getAccountId();
    const accountIdNumber = parseInt(accountIdString, 10);

    this.service.getLoggedInAccount(accountIdNumber).subscribe(
      data => {
        this.currentAccount = data;
        this.editedAccount = { ...data };
        console.log(data);
      },
      error => {
        console.error('Error fetching account data:', error);
      }
    );
  }

  saveAccount() {
    const editedFirstName = (<HTMLInputElement>document.getElementById('fname')).value;
    const editedLastName = (<HTMLInputElement>document.getElementById('lname')).value;
    const editedBirthDate = (<HTMLInputElement>document.getElementById('bdate')).value;
    const editedEmail = (<HTMLInputElement>document.getElementById('email')).value;
    const editedPassword = (<HTMLInputElement>document.getElementById('password')).value;
    const editedStreet = (<HTMLInputElement>document.getElementById('street')).value;
    const editedStreetNumber = (<HTMLInputElement>document.getElementById('streetnr')).value;
    const editedCity = (<HTMLInputElement>document.getElementById('city')).value;
    const editedPostalCode = (<HTMLInputElement>document.getElementById('postcode')).value;
    const editedCountry = (<HTMLInputElement>document.getElementById('country')).value;
  
    this.updatedAccount.AccountId = this.editedAccount.AccountId
    this.updatedAccount.AccountFirstName = editedFirstName;
    this.updatedAccount.AccountLastName = editedLastName;
    this.updatedAccount.AccountBirthDate = new Date(editedBirthDate).toISOString().split('T')[0];
    this.updatedAccount.AccountEmail = editedEmail;
    this.updatedAccount.AccountPassword = editedPassword;
    this.updatedAccount.AccountAddressStreet = editedStreet;
    this.updatedAccount.AccountAddressStreetNumber = parseInt(editedStreetNumber, 10);
    this.updatedAccount.AccountAddressCity = editedCity;
    this.updatedAccount.AccountAddressPostalCode = parseInt(editedPostalCode, 10);
    this.updatedAccount.AccountAddressCountry = editedCountry;
    this.updatedAccount.AccountPoints = parseInt(this.currentAccount.AccountPoints, 10);
    this.updatedAccount.AccountVouchers = [];
    
    this.service.updateAccount(this.currentAccount.AccountId, this.updatedAccount).subscribe(
      data => {
        console.log('Account updated successfully:', data);
        this.currentAccount = { ...this.editedAccount };
      },
      error => {
        console.error('Error updating account:', error);
      }
    );
  }
  
}