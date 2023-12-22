import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


/*
  This page shows the contents of the shopping cart
*/

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  constructor(private service:SharedService){

  }

  ItemList: any = [];

  ngOnInit(): void {
    this.ItemList = JSON.parse(localStorage.getItem("ItemList") || "[]");
  }

  updateShoppingCart(): void {
    localStorage.setItem("ItemList", JSON.stringify(this.ItemList));
  }

  addItemQuantity(item: any, quantity: number): void {
    item["PurchaseAmount"] += quantity;
    if (item.PurchaseAmount < 1) {
      if (!this.removeItem(item)) {
      item["PurchaseAmount"] -= quantity;
      }
    }
    this.updateShoppingCart();
  }

  removeItem(item: any): boolean {
    if (confirm("Are you sure to remove \"" + item.ItemName + "\" from your shopping cart?")) {
      this.ItemList = this.ItemList.filter((i: any) => i != item);
      this.updateShoppingCart();
      return true;
    }
    return false;
  }

}
