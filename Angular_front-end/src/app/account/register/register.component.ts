import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private service:SharedService) {}

  @Input() account:any;

  AccountFirstName:string = "";
  AccountLastName:string = "";
  AccountPicture:string = "empty-string";
  AccountBirthDate:Date = new Date("01-01-2023");
  AccountEmail:string = "";
  AccountPassword:string = "";
  AccountAddressStreet:string = "";
  AccountAddressCity:string = "";
  AccountAddressCountry:string = "";
  AccountAddressStreetNumber:number = 0;
  AccountAddressPostalCode:number = 0;

  ngOnInit(): void {    
  }

  addAccount(){
    var val = {
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
    console.log(val.AccountFirstName);
    console.log(val.AccountLastName);
    console.log(val.AccountPicture);
    console.log(val.AccountEmail);
    console.log(val.AccountPassword);
    console.log(val.AccountAddressStreet);
    console.log(val.AccountAddressCity);
    console.log(val.AccountAddressCountry);
    console.log(val.AccountAddressStreetNumber);
    console.log(val.AccountAddressPostalCode);
    this.service.addAccount(val).subscribe(res => {
      alert(res.toString());
    })

  }

  // registerAccount(){
  //   var val = {AccountId:this.AccountId,
  //     AccountFirstName: this.AccountFirstName,
  //     AccountLastName: this.AccountLastName,
  //     AccountPicture: this.AccountPicture,
  //     AccountBirthDate: this.AccountBirthDate,
  //     AccountEmail: this.AccountEmail,
  //     AccountPassword: this.AccountPassword,
  //     AccountAddressStreet: this.AccountAddressStreet,
  //     AccountAddressCity: this.AccountAddressCity,
  //     AccountAddressCountry: this.AccountAddressCountry,
  //     AccountAddressStreetNumber: this.AccountAddressStreetNumber,
  //     AccountAddressPostalCode: this.AccountAddressPostalCode,
  //   }
  //   this.service.updateAccount(val).subscribe(res => {
  //     alert(res.toString());
  //   })
  // }
}
