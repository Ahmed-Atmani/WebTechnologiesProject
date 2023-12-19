import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent implements OnInit{

  constructor(private route: ActivatedRoute, public service: SharedService, private loginservice: LoginService) {
    
  }


  PurchaseList: any[] = [];
  AccountId: string = '';

  isOpenPackageTrack: boolean = false;
  showPackageTrack: boolean = false;
  isOpenItems: boolean = false;
  showItems: boolean = false;

  togglePackageTrack() {
    this.isOpenPackageTrack = !this.isOpenPackageTrack;

    // Simulate loading with a delay
    this.showPackageTrack = true;
    setTimeout(() => {
      this.showPackageTrack = false;
    }, 2000); // Adjust the duration as needed
  }

  toggleItems() {
    this.isOpenItems = !this.isOpenItems;

    // Simulate loading with a delay
    this.showItems = true;
    setTimeout(() => {
      this.showItems = false;
    }, 2000); // Adjust the duration as needed
  }

  refreshItemList() {
    this.service.getMyPurchases(this.loginservice.getAccountId()).subscribe(data => {
      this.PurchaseList = data;
    }
    )
  }

  getPurchaseState(purchaseID: number) {
    this.service.getPurchaseState(purchaseID).subscribe(data => {
      return data;
    })
  }
  

  ngOnInit(): void {
    // Your existing code...
    alert(this.loginservice.getAccountId());
    this.service.getMyPurchases(this.loginservice.getAccountId()).subscribe(
      (data) => {
        // alert(JSON.stringify(data, null, 4));
        this.PurchaseList = data;
      }
    );
  }

}
