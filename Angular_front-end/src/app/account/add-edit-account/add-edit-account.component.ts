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

  ngOnInit(): void {
    this.AccountId = this.account.AccountId;
    this.AccountFirstName = this.account.AccountFirstName;
    this.AccountLastName = this.account.AccountLastName;
    this.AccountPicture = this.account.AccountPicture;
    
  }

  addAccount(){
    var val = {AccountId:this.AccountId,
      AccountFirstName: this.AccountFirstName,
      AccountLastName: this.AccountLastName,
      AccountPicture: this.AccountPicture
    }
    this.service.addAccount(val).subscribe(res => {
      alert(res.toString());
    })

  }

  updateAccount(){
    var val = {AccountId:this.AccountId,
      AccountFirstName: this.AccountFirstName,
      AccountLastName: this.AccountLastName,
      AccountPicture: this.AccountPicture
    }
    this.service.updateAccount(val).subscribe(res => {
      alert(res.toString());
    })
  }
}
