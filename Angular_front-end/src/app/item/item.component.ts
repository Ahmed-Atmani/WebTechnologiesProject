import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit{
  ItemId: number = -1;
  ItemName: string = "";
  ItemPrice: number = -1;
  ItemDetails: string = "";
  ItemCategoryId: number = -1;
  ItemCategoryName: String = "";

  constructor(private route: ActivatedRoute, private service: SharedService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ItemId = params['id'];
      this.service.getAllItems().subscribe(items => {
        var item: any = items.find(item => item.ItemId == this.ItemId);
  
        if (item) {
          this.ItemName = item.ItemName;
          this.ItemPrice = item.ItemPrice;
          this.ItemDetails = item.ItemDetails;
          this.ItemCategoryId = item.ItemCategory;
        } 
        else {
          console.error(`No item has the folowing id: ${this.ItemId}`);
          this.ItemName = "Item not found"
        }
      });
    });
  }
  
  

}
