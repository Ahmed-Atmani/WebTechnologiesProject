import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {
  ItemList: any = [];
  ImagesList: any = {};
  CategoryList: any = {};
  SelectedCategory: number = 0;
  maxPrice: number = 0;
  sellerMap: Map<number, string> = new Map<number, string>();
  selectedValue: number = 0;

  constructor(public service: SharedService, private cdr: ChangeDetectorRef) {}

  itemHasImage(item: any): boolean {
    return this.ImagesList[item.ItemId] !== null;
  }

  returnRightList(){
    this.filterItemsByPrice();
    return this.ItemList
  }
  
  ngOnInit(): void {
    this.fillItemList();
    this.fillCategoryList();
  }

  fillItemList() {
    this.service.getItemList().subscribe(data => {
      this.ItemList = data;
      this.calculateMaxPrice();
      this.fillImagesList();
    });
  }

  calculateMaxPrice() {
    this.maxPrice = Math.max(...this.ItemList.map((item: any) => item.ItemPrice));
  }

  onCategoryClick(categoryID: number) {
    this.SelectedCategory = categoryID;
  }

  filterItemsByPrice() {
    this.fillItemList();
    console.log(this.ItemList);
    const filteredItems = this.ItemList.filter((item: any) => item.ItemPrice <= this.selectedValue);
    console.log(this.filteredItemList);
    this.ItemList = filteredItems;
  }

  fillCategoryList() {
    this.service.getCategoryList().subscribe((categoryData: any[]) => {
      this.CategoryList = categoryData;
    });
  }


  filterItemState() {
    return this.ItemList.filter((item: any) => item.ItemState == 2);
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

  categorizedItemList(): any[] {
    if (this.SelectedCategory === 0) {
      return this.ItemList;
    } else {
      return this.ItemList.filter((item: any) => item.ItemCategory == this.SelectedCategory);
    }
  }

  filteredItemList(): any[] {
    let filteredItems = this.categorizedItemList();
    if (this.selectedValue > 0) {
      filteredItems = filteredItems.filter((item: any) => item.ItemPrice <= this.selectedValue);
    }
    if (!this.service.searchedKeyword) {
      return filteredItems;
    }
  
    const keyword = this.service.searchedKeyword.toLowerCase();
  
    return filteredItems.filter((item: any) => {
      const itemNameMatch = item.ItemName && item.ItemName.toLowerCase().includes(keyword);
      const itemBrandMatch = item.ItemBrand && item.ItemBrand.toLowerCase().includes(keyword);
  
      return itemNameMatch || itemBrandMatch;
    });
  }
  
}