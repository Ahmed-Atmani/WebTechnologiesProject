import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{

  constructor(private service: SharedService, private loginservice: LoginService) {

  }

  addItemForm: FormGroup = new FormGroup({

    ItemName: new FormControl('', [Validators.required]),
    ItemPrice: new FormControl('0', [Validators.required]),
    ItemCategory: new FormControl('', [Validators.required]),
    ItemDetails: new FormControl('', [Validators.required]),

  })

  ItemName:string = "";
  ItemPrice:number = 0;
  ItemState:number = 2;
  ItemCategory:string = "";
  ItemDetails:string = "";

  ngOnInit(): void {
    
  }

  addItem(){
    const itemCategoryValue = this.addItemForm.get('ItemCategory')?.value;
    const itemDetailValue = this. addItemForm.get('ItemDetails')?.value;

    var val = {
      ItemSeller: this.loginservice.getAccountId(),
      ItemName: this.ItemName,
      ItemPrice: this.ItemPrice,
      ItemState: this.ItemState,
      ItemCategory: itemCategoryValue,
      ItemDetails: itemDetailValue,
    }

    this.service.addItem(val).subscribe(res => {
      alert(res.toString());
    })
  }

}
