import { Component,Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  constructor(private service: SharedService) {}

  @Input() item:any;

  ItemId:string = "";
  ItemName: string = "";
  ItemDetails: string = "";
  ItemPrice: string = "";
  ItemState: number = 0;
  ItemRating: string = "";
  ItemBrand: string = "";
  ItemCategory: number = 0;
  ItemSeller: string = "";
  ItemImages: any = '';

  ngOnInit(): void {
  this.ItemId = this.item.ItemId;
  this.ItemName = this.item.ItemName;
  this.ItemDetails = this.item.ItemDetails;
  this.ItemPrice = this.item.ItemPrice;
  this.ItemState = this.item.ItemState;
  this.ItemRating = this.item.ItemRating;
  this.ItemBrand = this.item.ItemBrand;
  this.ItemCategory = this.item.ItemCategory;
  this.ItemSeller = this.item.ItemSeller;
  this.ItemImages = this.service.getImagesForItem(this.ItemId);
  }

  editItem() {
    var val = { ItemId:this.ItemId,
      ItemName:this.ItemName,
      ItemDetails:this.ItemDetails,
      ItemPrice:this.ItemPrice,
      ItemState:this.ItemState,
      ItemRating:this.ItemRating,
      ItemBrand:this.ItemBrand,
      ItemCategory:this.ItemCategory,
      ItemSeller:this.ItemSeller,
    }
    
    this.service.updateItem(this.ItemId, val).subscribe(res => {   
      console.log(val);
         
       alert(res.toString());
       window.location.reload();
    })
    const ItemImage = this.ItemImages;
    this.service.addImageForItem(this.ItemId, ItemImage);
  }
}
