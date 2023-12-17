import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-used-bestsellers',
  templateUrl: './used-bestsellers.component.html',
  styleUrls: ['./used-bestsellers.component.css']
})
export class UsedBestsellersComponent {

  bestsellers: any[] = [];

  constructor(private productService: ProductService, public service: SharedService) {}

  ItemList: any = [];
  ImagesList: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 4;

  ngOnInit(): void {
    this.productService.getBestsellers().subscribe((data: any) => {
      this.bestsellers = data;
    });

    
  
  this.fillItemList();
  }

  nextPage() {
    const maxPage = Math.ceil(this.filteredItemList().length / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    } else {
      // If at the end, go back to the first page
      this.currentPage = 1;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      // If at the beginning, go to the last page
      const maxPage = Math.ceil(this.filteredItemList().length / this.itemsPerPage);
      this.currentPage = maxPage;
    }
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItemList().slice(startIndex, endIndex);
  }

  itemHasImage(item: any): boolean {
    return this.ImagesList[item.ItemId] !== null;
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
      return this.ItemList.filter((item: any) => item.ItemState === 2);
    }
  
    const keyword = this.service.searchedKeyword.toLowerCase();
  
    return this.ItemList.filter((item: any) => {
      const itemNameMatch = item.ItemName && item.ItemName.toLowerCase().includes(keyword);
      const itemBrandMatch = item.ItemBrand && item.ItemBrand.toLowerCase().includes(keyword);
  
      return itemNameMatch || itemBrandMatch;
    });
  }  
}
