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
  map: any = [];

  ngOnInit(): void {
    this.getCartItems();
    this.initLeafletMap();
    this.initGeoCoder();
  }

  initLeafletMap(): void {
    this.map = L.map('map').setView([this.ShopLocation.latitude, this.ShopLocation.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addMarkerToMap(longitude: number, latitude: number, name: string): void {
    L.marker([longitude, latitude]).addTo(this.map).bindPopup(name);
  }

  initGeoCoder(): void {
    var api_key = 'cc863016aa0e4d35a9725dd2c9b8cb70';

    // reverse geocoding example (coordinates to address)
    // var latitude = '52.3877830';
    // var longitude = '9.7334394';
    // var query = latitude + ',' + longitude;

    // forward geocoding example (address to coordinate)
    var query = 'Vrije Universiteit Brussel, Belgium';
    // var query = 'Philipsbornstr. 2, 30165 Hannover, Germany';
    // note: query needs to be URI encoded (see below)

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
      + '?'
      + 'key=' + api_key
      + '&q=' + encodeURIComponent(query)
      + '&pretty=1'
      + '&no_annotations=1';

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = () => {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      if (request.status === 200){
        // Success!
        var data = JSON.parse(request.responseText);
        // alert(JSON.stringify(data, null, 4));
        // alert(data.results[0].formatted); // print the location
        // alert("lat: " + data.results[0].bounds.northeast.lat);
        // alert("lng: " + data.results[0].bounds.northeast.lng);

        var lat: number = data.results[0].bounds.northeast.lat;
        var long: number = data.results[0].bounds.northeast.lng;

        this.addMarkerToMap(lat, long, query);


      } else if (request.status <= 500){
        // We reached our target server, but it returned an error

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };

    request.send();  // make the request
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
