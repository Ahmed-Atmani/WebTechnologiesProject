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
  ImagesList: any = {};

  ngOnInit() {
    this.fillCategoryList()
  }

  fillCategoryList() {
    this.service.getAllCategories().subscribe(data => {
      this.CategoryList = data;
    });
  }

  categoryHasImage(category: any): boolean {
    return this.ImagesList[category.ItemCategoryId] !== null;
  }

  fillImagesList() {
    const imagePromises = this.CategoryList.map((category: any) => {
      return this.service.getImagesForCategory(category.ItemCategoryId).toPromise();
    });

    Promise.all(imagePromises).then(imagesArray => {
      imagesArray.forEach((images, index) => {
        this.ImagesList[this.CategoryList[index].ItemId] = images.length > 0 ? images[0] : null;
      });
    });
  }

  filterImage(categoryId: number): any {
    console.log(this.ImagesList);
    
    return this.ImagesList[categoryId] || null;
  }
}
