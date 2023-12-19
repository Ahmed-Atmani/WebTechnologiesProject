import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {
  currentAccount: any = null;
  editedAccount: any = null;
  updatedAccount: any = {};
  activatedFollowersComp: boolean = false;

  constructor(public login: LoginService, public service: SharedService) {
    this.fillAccount();
  }

  closeClick(){
    this.activatedFollowersComp = false;
    this.fillAccount();
  }

  viewFollowing() {
    this.activatedFollowersComp = true;
  }

  ngOnInit(): void {
    this.updatedAccount = { ...this.editedAccount };
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
  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete your account?')) {
      this.service.deleteAccount(accountId).subscribe(
        data => {
          console.log('Account deleted successfully:', data);
        },
        error => {
          console.error('Error deleting account:', error);
        }
      );
    }
  }

  saveAccount() {
    this.updatedAccount = { ...this.editedAccount };

    this.service.updateAccount(this.currentAccount.AccountId, this.updatedAccount).subscribe(
      data => {
        console.log('Account updated successfully:', data);
        this.currentAccount = { ...this.updatedAccount };
      },
      error => {
        console.error('Error updating account:', error);
      }
    );
  }
}
