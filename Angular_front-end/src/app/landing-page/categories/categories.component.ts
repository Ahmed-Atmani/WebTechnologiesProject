import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(public service: SharedService) {}
  CategoryList: any = [];

  ngOnInit() {
    this.fillCategoryList()
  }

  fillCategoryList() {
    this.service.getAllCategories().subscribe(data => {
      this.CategoryList = data;
    });
  }
}
