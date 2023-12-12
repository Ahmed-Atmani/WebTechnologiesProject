import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent {

  ItemList: any = [];
  TotalPrice: number = 0;

  ngOnInit(): void {
    // Get the shopping cart
    this.ItemList = JSON.parse(localStorage.getItem("ItemList") || "[]");

    this.ItemList.forEach((item: any) => {
        this.TotalPrice += parseFloat(item["ItemPrice"]);
    });
    this.TotalPrice = Math.round(this.TotalPrice * 100) / 100;
  }

}
