import { Component, Input, OnInit } from '@angular/core';
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
  Following: any[] = [];

  ngOnInit(): void {
    this.Following = this.account.Following;
    this.FollowingList = this.Following;
    this.fillFollowingList();  
  }

  getLength(): number {
    console.log(this.Following.length);
    
    return this.Following.length;
  }

  unfollow(following: number): void {
    this.service.removeAccountFromFollowing(this.account.AccountId, following).subscribe((response) => {
      alert("Succesfully unfollowed this seller");
      window.location.reload();
    }, 
    (error) => {
      console.error(error);
      
    })
  }

  fillFollowingList(): void {
    const accountPromises: Promise<any>[] = [];
    
    for (const following of this.FollowingList) {
      console.log(following);
      
      const promise = this.service.getAccount(following).toPromise();
      accountPromises.push(promise);
    }
  
    Promise.all(accountPromises).then(accounts => {
      this.FollowingList = accounts;
    });
  }
  
  

}
