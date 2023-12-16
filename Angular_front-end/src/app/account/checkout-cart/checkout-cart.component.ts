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

  // Leaflet map
  ShopLocation: any = { "latitude": 50.844278, "longitude": 2.961053 };
  LatestCoordinates = { "latitude": 500, "longitude": 500 }
  map: any = [];
  selectedPostOffice: any = [];
  

  ngOnInit(): void {
    this.getCartItems();
    this.initLeafletMap();
    this.addGeocodedMarker('Vrije Universiteit Brussel, Belgium', true);
    this.initPostOffices();
  }

  initPostOffices(): void {
    var postOffices: string[] = ["Bpost", "Mondial relay", "PostNL"];
    postOffices.forEach((post: string) => {
      this.markAllGeocodedResults(post);
    });
  }

  initLeafletMap(): void {
    this.map = L.map('map').setView([this.ShopLocation.latitude, this.ShopLocation.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addMarkerToMap(latitude: number, longitude: number, name: string): L.Marker {
    var marker = L.marker([latitude, longitude]);
    marker.addTo(this.map).bindPopup(name);
    return marker;
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

  makePostPopup(post: any, id: number): string {
    var text: string = "<h5>" + post.formatted.split(',')[0] + " " + post.components.state + "</h5>"; // Name
    text += "<p>" + post.formatted.substring(post.formatted.indexOf(',') + 1) + "</p>"; // Address
  
    return text;
  }

  choosePostOffice(office: any): void {
    this.selectedPostOffice = office;
    // var tokenized = office.formatted.split(", ");
    console.log("Selected post office: " + JSON.stringify(office, null, 4));

    var streetElement = document.getElementById("street") as HTMLInputElement;
    var streetNumberElement = document.getElementById("streetNumber") as HTMLInputElement;
    var cityElement = document.getElementById("city") as HTMLInputElement;
    var postCodeElement = document.getElementById("postCode") as HTMLInputElement;
    var countryElement = document.getElementById("country") as HTMLInputElement;    
    
    streetElement.value = office.components.road ?? office.components.square ?? "";
    streetNumberElement.value = office.components.house_number ?? "";
    cityElement.value = office.components.county ?? office.components.state ?? office.components.town ?? ""; //state/town
    postCodeElement.value = office.components.postcode ?? "";
    countryElement.value = office.components.country ?? "";
  }

  addPostOfficeMarker(office: any, id: number): void {
    var marker = this.addMarkerToMap(office.bounds.northeast.lat, office.bounds.northeast.lng, this.makePostPopup(office, id));
    marker.on('click', () => {
      this.choosePostOffice(office);
    })

  }

  markAllGeocodedResults(query: string): void {
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

    var counter: number = 0;
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
    request.onload = () => {
      if (request.status === 200) {
        var data = JSON.parse(request.responseText);
        var lst = data.results;
        lst.forEach((postOffice: any) => {
          // alert(JSON.stringify(postOffice, null, 4));
          this.addPostOfficeMarker(postOffice, counter);
          counter++;
        });

      } else if (request.status <= 500) {
        console.log('Unable to geocode! Response code: ' + request.status);
        var data = JSON.parse(request.responseText);
        console.log('Error msg: ' + data.status.message);

      } else {
        console.log('Server error');
      }
    };

    request.onerror = function () {
    };

    request.send(); // Make the request
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
