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
      AccountPicture:"",
      AccountBirthDate: new Date(2023, 1, 1),
      AccountEmail:"",
      AccountPassword:"",
      AccountAddressStreet: "", 
      AccountAddressCity: "", 
      AccountAddressCountry: "",  
      AccountAddressStreetNumber: 0, 
      AccountAddressPostalCode: 0
    }
    this.ModalTitle = "Add Account";
    this.ActivateAddEditAccountComp = true;

  }

  closeClick(){
    this.ActivateAddEditAccountComp = false;
    this.refreshAccountList();
  }

  editClick(dataItem:any) {
    this.account = dataItem;
    this.ModalTitle = "Edit Account";
    this.ActivateAddEditAccountComp = true;
  }

  deleteClick(dataItem:any){
    if (confirm("Are you sure?")){
      this.service.deleteAccount(dataItem.AccountId).subscribe(data => {
        // alert(data.toString());
        this.refreshAccountList();
      })
    }
  }

  refreshAccountList(){
    this.service.getAccountList().subscribe(data => {
      this.AccountList = data;
    });

  }
  
  

}
