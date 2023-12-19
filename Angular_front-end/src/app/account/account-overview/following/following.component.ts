import { Component, Input, OnInit } from '@angular/core';
import { error } from 'jquery';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit{

  FollowingList: any = [];

  constructor(private service: SharedService) {}

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
  AccountFollowing: any[] = [];

  ngOnInit(): void {
    this.AccountFollowing = this.account.AccountFollowing;
    this.FollowingList = this.AccountFollowing;
  }

  getLength(): number {
    console.log(this.AccountFollowing.length);
    
    return this.AccountFollowing.length;
  }

  unfollow(following: number): void {
    this.service.removeAccountFromFollowing(this.account.AccountId, following).subscribe((response) => {
      console.log(response);
    }, 
    (error) => {
      console.error(error);
      
    })
  }

}
