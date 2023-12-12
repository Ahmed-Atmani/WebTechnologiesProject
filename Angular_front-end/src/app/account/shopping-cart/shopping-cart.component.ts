import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

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
    console.log(localStorage.getItem("ItemList"));
    this.ItemList = JSON.parse(localStorage.getItem("ItemList") || "[]");
    console.log(JSON.stringify(this.ItemList, null, 4));

  // this.service.getItem(9).subscribe(item1 => {
  //   this.service.getItem(10).subscribe(item2 => {
  //     this.service.getItem(8).subscribe(item3 => {
  //       this.ItemList = [item1, item2, item3];
  //     });
  //   });
  // });
  }

}
