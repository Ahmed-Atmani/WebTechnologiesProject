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
  ShopLocation: any = { "latitude": 50.844278, "longitude": 2.961053 };
  LatestCoordinates = { "latitude": 500, "longitude": 500 }
  map: any = [];

  ngOnInit(): void {
    this.getCartItems();
    this.initLeafletMap();
    this.addGeocodedMarker('Vrije Universiteit Brussel, Belgium', true);
  }

  initLeafletMap(): void {
    this.map = L.map('map').setView([this.ShopLocation.latitude, this.ShopLocation.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addMarkerToMap(latitude: number, longitude: number, name: string): void {
    L.marker([latitude, longitude]).addTo(this.map).bindPopup(name);
  }

  goToCoordinates(latitude: number, longitude: number): void {
    this.map.setView([latitude, longitude], 12);
  }

  goToLatestCoordinates(): void {
    this.goToCoordinates(this.LatestCoordinates.latitude, this.LatestCoordinates.longitude);
  }

  addGeocodedMarker(query: string, goto: boolean): void {
    this.geocode(query).then(
      (result) => {
        this.addMarkerToMap(result.latitude, result.longitude, query);
        if (goto) {this.goToLatestCoordinates();}
      },
      (error) => {
        console.error(error);
      }
    );
  }

  geocode(query: string): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      var api_key = 'cc863016aa0e4d35a9725dd2c9b8cb70';
      var api_url = 'https://api.opencagedata.com/geocode/v1/json';
      var request_url =
        api_url +
        '?' +
        'key=' +
        api_key +
        '&q=' +
        encodeURIComponent(query) +
        '&pretty=1' +
        '&no_annotations=1';
  
      var request = new XMLHttpRequest();
      request.open('GET', request_url, true);
      request.onload = () => {
        if (request.status === 200) {
          var data = JSON.parse(request.responseText);
          const latitude = data.results[0].bounds.northeast.lat;
          const longitude = data.results[0].bounds.northeast.lng;
          this.LatestCoordinates = {longitude, latitude};
          resolve({ longitude, latitude });

        } else if (request.status <= 500) {
          console.log('unable to geocode! Response code: ' + request.status);
          var data = JSON.parse(request.responseText);
          console.log('error msg: ' + data.status.message);
          reject('Error during geocoding');

        } else {
          console.log('server error');
          reject('Server error during geocoding');
        }
      };
  
      request.onerror = function () {
        reject('Connection error during geocoding');
      };
  
      request.send(); // make the request
    });
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
