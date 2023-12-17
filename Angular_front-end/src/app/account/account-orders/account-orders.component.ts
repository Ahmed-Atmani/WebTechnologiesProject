import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent {

  purchases: any[] = [
    
  ]

  isOpen: boolean = false;
  showProgressBar: boolean = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;

    // Simulate loading with a delay
    this.showProgressBar = true;
    setTimeout(() => {
      this.showProgressBar = false;
    }, 2000); // Adjust the duration as needed
  }

  AccountId: number = -1;
  AccountFirstName: string = '';
  AccountLastName: string = '';
  AccountPicture: string = '';
  AccountBirthDate: string = '';
  AccountEmail: string = '';
  AccountPassword: string = '';
  AccountAddressStreet: string = '';
  AccountAddressCity: string = '';
  AccountAddressCountry: string = '';
  AccountAddressStreetNumber: number = -1;
  AccountAddressPostalCode: number = -1;
  User: any;
  AccountPoints: number = -1;
  AccountVouchers: any[] = [];

  // Properties specific to AccountOrdersComponent
  PurchaseId: number = -1;
  Items: any[] = [];
  Purchase_date: string = '';
  Shipping_date: string = '';
  Delivery_time: number = -1;
  Status: number = -1;

  constructor(private route: ActivatedRoute, public service: SharedService) {
    // Initialize the Account properties
    this.AccountId = 1; // Replace with actual value
    this.AccountFirstName = 'John'; // Replace with actual value
    // ... Initialize other properties ...

    // Initialize other properties specific to AccountOrdersComponent
    this.PurchaseId = 123; // Replace with actual value
    this.Items = []; // Initialize as needed
    // ... Initialize other properties ...
  }

  ngOnInit(): void {
    // Your existing code...
  }

}
