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
  item: any;
  ModalTitle:string = "";

  ActivateEditItemComp: boolean = false;


  ngOnInit(): void {
    this.refreshItemList();
  }

  closeClick(){
    this.ActivateEditItemComp = false;
    this.refreshItemList();
  }

  editItem(dataItem:any) {
    this.item = dataItem;
    this.ModalTitle = "Edit Item";
    this.ActivateEditItemComp = true;
  }

  deleteItem(dataItem: any) {
    if (confirm("Are you sure to delete this item?")) {
      this.service.deleteItem(dataItem).subscribe(data => {
        alert(data.toString());
        this.refreshItemList();
      })
  }
}
  

  refreshItemList() {
    
    this.service.getMyItems(this.loginservice.getAccountId()).subscribe(data => {
      console.log(data);
      
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
