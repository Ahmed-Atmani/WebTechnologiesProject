import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit{
  ItemId: number = -1;
  ItemName: string = "";
  ItemPrice: number = -1;
  ItemDetails: string = "";
  ItemCategoryId: number = -1;
  ItemCategoryName: String = "";
  PurchaseAmount: number = 1;

  constructor(private route: ActivatedRoute, private service: SharedService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ItemId = params['id'];

      this.service.getItem(this.ItemId).subscribe(item => {
        console.log(JSON.stringify(item, null, 4));
        this.ItemName = item.ItemName;
        this.ItemPrice = item.ItemPrice;
        this.ItemDetails = item.ItemDetails;
        this.ItemCategoryId = item.ItemCategory;
      },
      error => {
        console.error(`No item has the folowing id: ${this.ItemId}`);
        this.ItemName = "Item not found";
      });
      
    });
  }
  AddItemToCart(): void {
    var item: any = {
      "ItemId": this.ItemId,
      "ItemName": this.ItemName,
      "ItemPrice": this.ItemPrice,
      "ItemDetails": this.ItemDetails,
      "ItemCategoryId": this.ItemCategoryId,
      "ItemCategoryName": this.ItemCategoryName,
      "PurchaseAmount": this.PurchaseAmount
    };
    console.log(localStorage.getItem("ItemList"));

    var temp: any[] = JSON.parse(localStorage.getItem("ItemList") || "[]");

    if (temp == null) {
      temp = [item];
    }
    else {
      temp.push(item);
    }
    localStorage.setItem("ItemList", JSON.stringify(temp));
    console.log(localStorage.getItem("ItemList"));
    alert("Item successfully added to shopping cart!");
  }

  ClearCart(): void {
    localStorage.clear();
    console.log(localStorage.getItem("ItemList"));

  }

}
