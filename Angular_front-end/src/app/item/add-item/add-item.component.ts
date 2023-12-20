import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private service: SharedService, private loginservice: LoginService) {}

  addItemForm: FormGroup = new FormGroup({
    ItemName: new FormControl('', [Validators.required]),
    ItemPrice: new FormControl('0', [Validators.required]),
    ItemCategory: new FormControl(null, [Validators.required]),
    ItemDetails: new FormControl('', [Validators.required]),
  });

  ItemState: number = 2;
  CategoryList: any[] = [];

  fillCategoryList(): void {
    this.service.getAllCategories().subscribe((data) => {
      this.CategoryList = data;
    });
  }

  ngOnInit(): void {
    this.fillCategoryList();
  }

  addItem(): void {
    const itemDetailValue = this.addItemForm.get('ItemDetails')?.value;

    const val = {
      ItemSeller: parseInt(this.loginservice.getAccountId()),
      ItemName: this.addItemForm.get('ItemName')?.value,
      ItemPrice: this.addItemForm.get('ItemPrice')?.value.toFixed(2).toString(),
      ItemState: 2,
      ItemCategory: +this.addItemForm.get('ItemCategory')?.value,
      ItemDetails: itemDetailValue,
    };

    alert(JSON.stringify(val, null, 4));

    this.service.addItem(val).subscribe(res => {
      console.log(val);
      
      alert(JSON.stringify(val, null, 4));
      alert(res.toString());
    });
  }
}
