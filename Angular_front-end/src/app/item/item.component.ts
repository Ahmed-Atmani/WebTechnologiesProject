import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { NgIf } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  ItemId: number = -1;
  ItemName: string = "";
  ItemPrice: number = -1;
  ItemDetails: string = "";
  ItemState: number = -1;
  ItemCategoryId: number = -1;
  ItemCategoryName: String = "";
  ItemSeller: number = -1;
  PurchaseAmount: number = 1;
  ImagesList: any[] = [];
  ReviewList: any[] = [];
  ReviewText:string = "";
  Rating: number = 5;

  constructor(private route: ActivatedRoute, public service: SharedService, private loginservice: LoginService) {
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
        this.ItemSeller = item.ItemSeller;
        this.ItemState = item.ItemState;

        this.fillImagesList(this.ItemId).subscribe(images => {
          this.ImagesList = images;
          this.ImagesList.forEach(img => {
            img.src = this.service.APIUrl;
          })
          // alert(JSON.stringify(images, null, 4));
        });


        this.fillReviewList(this.ItemId).subscribe(reviews => {
          this.ReviewList = reviews;
          this.ReviewList.forEach(review => {
          this.service.getAccount(review.Reviewer).subscribe((response: any) => {
  review.ReviewerName = response['AccountFirstName'] + ' ' + response['AccountLastName'] })});
        });
      },
      error => {
        console.error(`No item has the following id: ${this.ItemId}`);
        this.ItemName = "Item not found";
        
        // TEMP: movies
        this.service.searchMoviesByTitle(params['id']).subscribe(
          (data) => {
            this.service.getMovieDetailsById(data.Search[0].imdbID).subscribe(
              (movie) => {
                console.log(data);
                // this.ItemId = movie.imdbID;
                this.ItemName = movie.Title;
                var img = {"Image": movie.Poster, "src": ""};
                this.ImagesList = [img];
                this.ItemDetails = movie.Plot;
                // alert(JSON.stringify(movie, null, 4));
              }
            );
          },
          (error) => {
            console.error(error);
          }
        );


      });
    });
  }

  getItemState(): number {
    return this.ItemState;
  }

  followSeller(): void {
    const sellerId = this.ItemSeller;
    var followerId: any = this.loginservice.getAccountId();
    followerId = parseInt(followerId, 10);
    console.log(sellerId);
    console.log(followerId);
    
    
    this.service.addAccountToFollowing(followerId, sellerId).subscribe(
      (response) => {
        console.log(response); // Handle successful follow response
        alert("Succesfully followed this seller!")
      },
      (error) => {
        console.error(error); // Handle error
      }
    );
  }

  getSeller(accountID: number): string {
    var sellerName: string = '';


    
    // if (this.sellerMap.has(accountID)) {
    //   return this.sellerMap.get(accountID)!;
    // }

    // const sellerName: any = this.service.getAccountName(accountID).pipe(
    //   map(seller => (seller ? seller.toString() : 'Unknown Seller',
    //   console.log('Seller:' + seller))),
      
      
    //   catchError(() => of('Unknown Seller')),
    //   finalize(() => this.sellerMap.set(accountID, sellerName))
    // );
    // const sellerName: string = '';

    // this.service.getItemList().subscribe((item => {

    // }))
    return sellerName;
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

  fillImagesList(itemId: number): Observable<any[]> {
    return this.service.getImagesForItem(itemId);
  }

  fillReviewList(itemId: number): Observable<any[]> {
    return this.service.getReviewsForItem(itemId);
  }

  submitReview() {
    const val: any = {
      Reviewer: this.loginservice.getAccountId(),
      ReviewText: this.ReviewText,
      Item: this.ItemId,
      Rating: this.Rating
    };
    this.service.addReview(val).subscribe(res => {
      alert(res.toString());
    })
  }

}
