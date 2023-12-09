import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit {

  constructor(private service:SharedService) {}

  @Input() account:any;

  AccountId:string = "";
  AccountFirstName:string = "";
  AccountLastName:string = "";
  AccountPicture:string = "";
  AccountBirthDate:Date = new Date(2023, 1, 1);
  AccountEmail:string = "";
  AccountPassword:string = "";
  AccountAddressStreet:string = "";
  AccountAddressCity:string = "";
  AccountAddressCountry:string = "";
  AccountAddressStreetNumber:number = 0;
  AccountAddressPostalCode:number = 0;

  ngOnInit(): void {
    this.AccountId = this.account.AccountId;
    this.AccountFirstName = this.account.AccountFirstName;
    this.AccountLastName = this.account.AccountLastName;
    this.AccountPicture = this.account.AccountPicture;
    this.AccountBirthDate = this.account.AccountBirthDate;
    this.AccountEmail = this.account.AccountEmail;
    this.AccountPassword = this.account.AccountPassword;
    this.AccountAddressStreet = this.account.AccountAddressStreet;
    this.AccountAddressCity = this.account.AccountAddressCity;
    this.AccountAddressCountry = this.account.AccountAddressCountry;
    this.AccountAddressStreetNumber = this.account.AccountAddressStreetNumber;
    this.AccountAddressPostalCode = this.account.AccountAddressPostalCode;

  }

  addAccount(){
    var val = {AccountId:this.AccountId,
      AccountFirstName: this.AccountFirstName,
      AccountLastName: this.AccountLastName,
      AccountPicture: this.AccountPicture,
      AccountBirthDate: this.AccountBirthDate,
      AccountEmail: this.AccountEmail,
      AccountPassword: this.AccountPassword,
      AccountAddressStreet: this.AccountAddressStreet,
      AccountAddressCity: this.AccountAddressCity,
      AccountAddressCountry: this.AccountAddressCountry,
      AccountAddressStreetNumber: this.AccountAddressStreetNumber,
      AccountAddressPostalCode: this.AccountAddressPostalCode,
    }
    console.log(val.AccountBirthDate);
    this.service.addAccount(val).subscribe(res => {
      alert(res.toString());
    })

  }

  updateAccount(){
    var val = {AccountId:this.AccountId,
      AccountFirstName: this.AccountFirstName,
      AccountLastName: this.AccountLastName,
      AccountPicture: this.AccountPicture,
      AccountBirthDate: this.AccountBirthDate,
      AccountEmail: this.AccountEmail,
      AccountPassword: this.AccountPassword,
      AccountAddressStreet: this.AccountAddressStreet,
      AccountAddressCity: this.AccountAddressCity,
      AccountAddressCountry: this.AccountAddressCountry,
      AccountAddressStreetNumber: this.AccountAddressStreetNumber,
      AccountAddressPostalCode: this.AccountAddressPostalCode,
    }
    this.service.updateAccount(this.AccountId, val).subscribe(res => {
      alert(res.toString());
    })
  }
}
