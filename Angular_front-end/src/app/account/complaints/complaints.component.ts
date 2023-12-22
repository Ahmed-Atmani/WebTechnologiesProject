import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { LoginService } from 'src/app/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  constructor(private service: SharedService, private loginservice: LoginService, private location: Location) {

  }

  ComplaintList: any = [];
  AccountId: string = '';
  ItemId: number | undefined;
  PurchaseId: number | undefined;
  ComplaintText:string = "";

  ngOnInit(): void {
    this.refreshComplaintList();
  }

  refreshComplaintList() {
    this.service.getMyComplaintsList(this.loginservice.getAccountId()).subscribe(data => {
      this.ComplaintList = data;

      // Replace ItemId by ItemName
      for (const dataItem of this.ComplaintList) {
        if (dataItem.Item !== null) {
          this.service.getItem(dataItem.Item).subscribe(data => {
            dataItem.ItemName = data["ItemName"]
          })
        }}})}

  submitComplaint() {
    const val: any = {
      Account: this.loginservice.getAccountId(),
      Description: this.ComplaintText,
      Item: '',
      Purchase: '',
    };
    if (this.ItemId !== undefined) {
      val["Item"] = this.ItemId;}
    if (this.PurchaseId !== undefined) {
      val["Purchase"] = this.PurchaseId;}
    this.service.addComplaint(val).subscribe(res => {
      window.location.reload();
      //alert(res.toString());
    })

  }
}

