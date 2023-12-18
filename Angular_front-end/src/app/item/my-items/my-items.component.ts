import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit{
  constructor(public service: SharedService, private loginservice: LoginService) {

  }

  ItemList: any = [];
  AccountId: string = '';
  ImagesList: any = {};


  ngOnInit(): void {
    this.refreshItemList();
  }

  refreshItemList() {
    this.service.getMyItems(this.loginservice.getAccountId()).subscribe(data => {
      this.ItemList = data;
      this.fillImagesList();
    }
    )
  }

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
