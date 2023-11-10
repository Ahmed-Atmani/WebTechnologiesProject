import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-account',
  templateUrl: './show-account.component.html',
  styleUrls: ['./show-account.component.css']
})
export class ShowAccountComponent implements OnInit {
  constructor(private service:SharedService){

  }

  AccountList:any = [];

   

  ngOnInit(): void {
    this.refreshAccountList();
  }

  refreshAccountList(){
    this.service.getAccountList().subscribe(data => {
      this.AccountList = data;
    });

  }

}
