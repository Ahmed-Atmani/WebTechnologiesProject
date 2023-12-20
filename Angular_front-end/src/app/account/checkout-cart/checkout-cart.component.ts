import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { PaintService } from './paint.service';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit, AfterViewInit{

  constructor(private paintService: PaintService, private sharedService: SharedService, private router: Router) {}

  // == Shopping cart items
  ItemList: any = [];
  TotalPrice: number = 0;

  // == Canvas 2D gift message
  canvas: any = {};
  context: any = {};
  SelectedRadioChoice: boolean = false; // true => with custom message
  @ViewChild('customMessageCanvas') customMessageCanvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;

  // == Leaflet map
  ShopLocation: any = { "latitude": 50.844278, "longitude": 2.961053 };
  LatestCoordinates = { "latitude": 500, "longitude": 500 }
  map: any = [];
  selectedPostOffice: any = [];
  

  ngOnInit(): void {
    this.getCartItems();
    this.initLeafletMap();
    this.goToGeocode("Brussels");
    this.initPostOffices();
  }

  ngAfterViewInit(): void {
    const canvas = this.customMessageCanvas.nativeElement;
    this.paintService.initializeCanvas(canvas);
  }

  // === SHOPPING CART ITEMS ===
  checkout(): void {
    // get payment option
    
    // get image
    var image = "";
    if (this.SelectedRadioChoice) {
      image = this.paintService.getImageData(this.customMessageCanvas.nativeElement);
    }
    
    // get account id
    var accountIdString: string | null = localStorage.getItem("user_id");
    var accountId: any = accountIdString ? JSON.parse(accountIdString) : null;
    
    // get get item lists 
    var items: any = JSON.parse(localStorage.getItem("ItemList") as string);
    var itemList: any = items.map((item: any) => parseInt(item.ItemId));
    
    // get address
    var streetElement = document.getElementById("street") as HTMLInputElement;
    var streetNumberElement = document.getElementById("streetNumber") as HTMLInputElement;
    var cityElement = document.getElementById("city") as HTMLInputElement;
    var postCodeElement = document.getElementById("postCode") as HTMLInputElement;
    var countryElement = document.getElementById("country") as HTMLInputElement;   

    var street = streetElement.value;
    var streetNumber = parseInt(streetNumberElement.value);
    var city = cityElement.value;
    var postCode = postCodeElement.value;
    var country = countryElement.value;

    var address: any = {
        "PurchaseStreet": street,      
        "PurchaseStreetNumber": streetNumber,
        "PurchaseCity": city,
        "PurchasePostalCode": postCode,
        "PurchaseCountry": country,      
    };

    // perform transaction
    this.sharedService.addPurchase(itemList, accountId, address, image).subscribe(res =>{
      alert(res);
      if (res == "Added successfully!") {
        // localStorage.setItem("ItemList", "[]");
        this.router.navigate(["/order-finished"]);
      }
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

  getItemPriceWithAmount(item: any): string {
    var temp: number = parseFloat(item["ItemPrice"]) * parseInt(item["PurchaseAmount"]);
    // return Math.round(temp * 100) / 100;
    return temp.toFixed(2);
  }

  // === CANVAS 2D GIFT MESSAGE ===

  changedCustomMessageRadio(val: boolean): void {
    this.SelectedRadioChoice = val;
    var yesCustomMessageRadio: any = document.getElementById('yes-custom-message');
    var customMessageCanvas: any = document.getElementById('canvas-div');

    if (yesCustomMessageRadio.checked) {
      customMessageCanvas.style.display = "block";
    }
    else {
      customMessageCanvas.style.display = "none";
    }
  }

  clearCanvas2D(): void {
    this.paintService.clearCanvas();
  }

  // === LEAFLET MAP ===
  goToGeocode(query: string): void {
    this.geocode(query).then(
      (result) => {
        this.goToCoordinates(result.latitude, result.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  initPostOffices(): void {
    var postOffices: string[] = ["Bpost", "Mondial relay", "PostNL", "Post", "post office", "postkantoor"];
    postOffices.forEach((post: string) => {
      this.markAllGeocodedResults(post);
    });
  }

  initLeafletMap(): void {
    this.map = L.map('map').setView([this.ShopLocation.latitude, this.ShopLocation.longitude], 5);
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
    this.map.setView([latitude, longitude], 5);
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
    var text: string = "<h2>" + post.formatted.split(',')[0] + " " + post.components.state + "</h2>"; // Name
    text += "<p>" + post.formatted.substring(post.formatted.indexOf(',') + 1) + "</p>"; // Address
  
    return text;
  }

  // Called when user clicks on a post office's marker 
  choosePostOffice(office: any): void {
    this.selectedPostOffice = office;
    this.setFormAddress(office);
  }

  setFormAddress(place: any): void {
    var streetElement = document.getElementById("street") as HTMLInputElement;
    var streetNumberElement = document.getElementById("streetNumber") as HTMLInputElement;
    var cityElement = document.getElementById("city") as HTMLInputElement;
    var postCodeElement = document.getElementById("postCode") as HTMLInputElement;
    var countryElement = document.getElementById("country") as HTMLInputElement;    
    
    streetElement.value = place.components.road ?? place.components.square ?? "";
    streetNumberElement.value = place.components.house_number ?? "";
    cityElement.value = place.components.county ?? place.components.state ?? place.components.town ?? place.components.village ?? "";
    postCodeElement.value = place.components.postcode ?? "";
    countryElement.value = place.components.country ?? "";
  }

  // Called when user inputs an address 
  goToInputAddress(): void {
    var streetElement = document.getElementById("street") as HTMLInputElement;
    var streetNumberElement = document.getElementById("streetNumber") as HTMLInputElement;
    var cityElement = document.getElementById("city") as HTMLInputElement;
    var postCodeElement = document.getElementById("postCode") as HTMLInputElement;
    var countryElement = document.getElementById("country") as HTMLInputElement;   

    var street = streetElement.value;
    var streetNumber = streetNumberElement.value;
    var city = cityElement.value;
    var postCode = postCodeElement.value;
    var country = countryElement.value; 

    this.geocode(street + " " + streetNumber + ", " + postCode + " " + city + ", " + country).then(
      (result) => {
        this.goToCoordinates(result.latitude, result.longitude);

        var office = result.results[0];
        this.setFormAddress(office);

        this.addMarkerToMap(result.latitude, result.longitude, "Home");
      }
    );
  }

  addPostOfficeMarker(office: any, id: number): void {
    var marker = this.addMarkerToMap(office.bounds.northeast.lat, office.bounds.northeast.lng, this.makePostPopup(office, id));
    marker.on('click', () => {
      this.choosePostOffice(office);
    });
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

  geocode(query: string): Promise<{ latitude: number; longitude: number; results: any}> {
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
          resolve({ longitude, latitude , results: data.results});

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
}
