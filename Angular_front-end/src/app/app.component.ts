import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'omnicart';
  ItemList: any[] = [];

  constructor(public service: SharedService) {
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
