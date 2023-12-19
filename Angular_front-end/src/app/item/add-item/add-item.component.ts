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
  ItemCategory:number = 0;
  ItemDetails:string = "";

  CategoryList: any[] = [];


  fillCategoryList():void {
    this.service.getAllCategories().subscribe((data)=>{
      this.CategoryList = data;
  }   
  )
}

  ngOnInit(): void {
    this.fillCategoryList();
  }

  revertCategory(id: number): void{
    this.ItemCategory = id;
  }

  addItem(){
    const itemDetailValue = this. addItemForm.get('ItemDetails')?.value;

    var val = {
      ItemSeller: parseInt(this.loginservice.getAccountId()),
      ItemName: this.ItemName,
      ItemPrice: this.ItemPrice.toFixed(2).toString(),
      ItemState: 2,
      ItemCategory: this.ItemCategory,
      ItemDetails: itemDetailValue,
    }

    alert(JSON.stringify(val, null, 4));

    this.service.addItem(val).subscribe(res => {
      alert(JSON.stringify(val, null, 4));

      alert(res.toString());
    })
  }

}
