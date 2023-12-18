import { Component } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-account-points',
  templateUrl: './account-points.component.html',
  styleUrls: ['./account-points.component.css']
})
export class AccountPointsComponent {
  currentAccount: any = null;
  lastClickedPoints: number | null = null;
  confirmationData = {
    showConfirmation: false,
    points: 0,
    redemptionMessage: ''
  };

  constructor(public login: LoginService, public service: SharedService) {
    this.fillAccount();
  }

  fillAccount(): void {
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

  showConfirmation(points: number): void {
    this.confirmationData.showConfirmation = true;
    this.confirmationData.points = points;
    this.confirmationData.redemptionMessage = '';
  }

  confirmRedeem(): void {
    if (this.checkAccountPoints(this.confirmationData.points)) {
      this.confirmationData.showConfirmation = false;
      this.confirmationData.redemptionMessage = 'Points redeemed successfully!';

      const updatedAccount = { ...this.currentAccount };
  
      updatedAccount.AccountPoints -= this.confirmationData.points;
  
      this.currentAccount = updatedAccount;
  
      this.service.updateAccount(this.currentAccount.AccountId, this.currentAccount).subscribe(
        data => {
          console.log('Account updated successfully:', data);
        },
        error => {
          console.error('Error updating account:', error);
        }
      );
    } else {     
      this.confirmationData.redemptionMessage = 'Not enough Omnipoints for redemption.';
    }
  }
  

  checkAccountPoints(points: number): boolean {
    return this.currentAccount?.AccountPoints > points;
  }

  calculateVoucherAmount(points: number): string {
    if (points === 100) {
      return '€10 voucher';
    } else if (points === 200) {
      return '€25 voucher';
    } else if (points === 300) {
      return '€50 voucher';
    } else if (points === 400) {
      return '€100 voucher';
    } else {
      return 'Unknown voucher amount';
    }
  }
}
