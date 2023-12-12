import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  constructor(private service: SharedService) {

  }

  ComplaintList: any = [];
   // TODO: get current logged in accountID, now default use of 2
  AccountId: string = '2';
  ItemId: number | undefined;
  PurchaseId: number | undefined;
  ComplaintText:string = "";

  ngOnInit(): void {
    this.refreshComplaintList();
  }

  refreshComplaintList() {
    this.service.getMyComplaintsList(this.AccountId).subscribe(data => {
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
      Account: this.AccountId,
      Description: this.ComplaintText,
    };
    if (this.ItemId !== undefined) {
      val["Item"] = this.ItemId;}
    if (this.PurchaseId !== undefined) {
      val["Purchase"] = this.PurchaseId;}
    this.service.addComplaint(val).subscribe(res => {
      alert(res.toString());
    })

  }
}

