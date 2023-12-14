import { Component } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent {

  ItemList: any = [];
  TotalPrice: number = 0;

  ngOnInit(): void {
    this.getCartItems();
    this.initLeafletMap();
  }

  initLeafletMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    const latitude = 49.327380;
    const longitude = 23.754300;
    const altitude = 0;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // L.marker([51.505, -0.09]).addTo(map)
    //   .bindPopup('A sample marker.');
  }

  getCartItems(): void {
    this.ItemList = JSON.parse(localStorage.getItem("ItemList") || "[]");
    this.TotalPrice = this.calcTotalPrice();
  }

  calcTotalPrice(): number {
    this.ItemList.forEach((item: any) => {
      this.TotalPrice += parseFloat(item["ItemPrice"]) * parseInt(item["PurchaseAmount"]);
    });
    return Math.round(this.TotalPrice * 100) / 100;
  }
}
