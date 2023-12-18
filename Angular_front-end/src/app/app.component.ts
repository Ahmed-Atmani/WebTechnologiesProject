import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'omnicart';
  ItemList: any[] = [];
  AccountId: string = '';

  constructor(public service: SharedService, private loginservice: LoginService) {
  }

  ngOnInit(): void {
    this.AccountId = this.loginservice.getAccountId();
  }

  logOut(): void {
    this.service.updateAccountId('no-id');
    this.AccountId = 'no-id';
    this.loginservice.logout();
  }

  display(): void {
    console.log();
    
  }

  searchByKeyword(searchedkeyword: any) {
    this.service.updateSearchedKeyword(searchedkeyword);
  }

  filteredItemList(): any[] {
    if (!this.service.searchedKeyword) {
      return this.ItemList;
    }
  
    const keyword = this.service.searchedKeyword.toLowerCase();
  
    return this.ItemList.filter((item: any) => {
      const itemNameMatch = item.ItemName && item.ItemName.toLowerCase().includes(keyword);
      const itemBrandMatch = item.ItemBrand && item.ItemBrand.toLowerCase().includes(keyword);
  
      return itemNameMatch || itemBrandMatch;
    });
  }

  
  
}
