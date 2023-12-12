import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private service: SharedService) {}

  ItemList: any = [];

  ngOnInit(): void {
    this.fillItemList();
  }

  fillItemList(){
    this.service.getItemList().subscribe(data => {
      this.ItemList = data;
    }
    );

  }
}
