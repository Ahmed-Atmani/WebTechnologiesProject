import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{

  constructor(private service: SharedService) {

  }

  addItemForm: FormGroup = new FormGroup({

    ItemName: new FormControl('', [Validators.required]),
    ItemPrice: new FormControl('0', [Validators.required]),
    ItemPicture: new FormControl('', [Validators.required]),
    ItemType: new FormControl('', [Validators.required]),
    ItemCategory: new FormControl('', [Validators.required]),
    ItemDetails: new FormControl('', [Validators.required]),

  })

  ItemName:string = "";
  ItemPrice:number = 0;
  ItemPicture:string = "";
  ItemType:string = "";
  ItemCategory:string = "";
  ItemDetails:string = "";

  ngOnInit(): void {
    
  }

  addItem(){
    const itemTypeValue = this.addItemForm.get('ItemType')?.value;
    const itemCategoryValue = this.addItemForm.get('ItemCategory')?.value;
    const itemDetailValue = this. addItemForm.get('ItemDetails')?.value;

    var val = {
      ItemName: this.ItemName,
      ItemPrice: this.ItemPrice,
      ItemPicture: this.ItemPicture,
      ItemType: itemTypeValue,
      ItemCategory: itemCategoryValue,
      ItemDetails: itemDetailValue,
    }

    this.service.addItem(val).subscribe(res => {
      alert(res.toString());
    })
  }

}
