import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.css']
})
export class MyWishlistComponent implements OnInit {
  ItemList: any[] = [];
  ImagesList: any[] = [];

  constructor(public service: SharedService) {}

  ngOnInit(): void {
    // this.loadWishlistItems();
  }

  // loadWishlistItems() {
  //   this.service.getWishlistItems().subscribe((data: any[]) => {
  //     this.ItemList = data;
  //   });
  // }

  filterImage(itemId: number): any {
    return this.ImagesList[itemId] || null;
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
}