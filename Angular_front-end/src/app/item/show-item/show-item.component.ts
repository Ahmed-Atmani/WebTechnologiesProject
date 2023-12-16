import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {
  constructor(public service: SharedService) {}

  ItemList: any = [];
  ImagesList: any = {};

  ngOnInit(): void {
    this.fillItemList();
  }

  fillItemList() {
    this.service.getItemList().subscribe(data => {
      this.ItemList = data;
      this.fillImagesList();
    });
  }

  fillImagesList() {
    const imagePromises = this.ItemList.map((item: any) => {
      return this.service.getImagesForItem(item.ItemId).toPromise();
    });

    Promise.all(imagePromises).then(imagesArray => {
      imagesArray.forEach((images, index) => {
        this.ImagesList[this.ItemList[index].ItemId] = images.length > 0 ? images[0] : null;
      });
    });
  }

  filterImage(itemId: number): any {
    return this.ImagesList[itemId] || null;
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
