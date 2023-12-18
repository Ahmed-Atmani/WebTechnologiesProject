import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClientJsonpModule } from '@angular/common/http';

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
  ItemCategoryId: number = -1;
  ItemCategoryName: String = "";
  PurchaseAmount: number = 1;
  ImagesList: any[] = [];
  ReviewList: any[] = [];

  constructor(private route: ActivatedRoute, public service: SharedService) {
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

        this.fillImagesList(this.ItemId).subscribe(images => {
          this.ImagesList = images;
          this.ImagesList.forEach(img => {
            img.src = this.service.APIUrl;
          })
          // alert(JSON.stringify(images, null, 4));
        });

        this.fillReviewList(this.ItemId).subscribe(reviews => {
          this.ReviewList = reviews;
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
}
