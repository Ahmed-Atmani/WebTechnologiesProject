import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-account',
  templateUrl: './show-account.component.html',
  styleUrls: ['./show-account.component.css'],
})
export class ShowAccountComponent implements OnInit {
  constructor(private service:SharedService){

  }

  AccountList:any = [];
  
  ModalTitle:string = "";
  ActivateAddEditAccountComp:boolean = false;
  account:any;
   
  ngOnInit(): void {
    this.refreshAccountList();
  }

  addClick(){
    this.account = {
      AccountId:0,
      AccountFirstName:"",
      AccountLastName:"",
      AccountPicture:""
    }
    this.ModalTitle = "Add Account";
    this.ActivateAddEditAccountComp = true;

  }

  closeClick(){
    this.ActivateAddEditAccountComp = false;
    this.refreshAccountList();
  }

  refreshAccountList(){
    this.service.getAccountList().subscribe(data => {
      this.AccountList = data;
    });

  }

}
