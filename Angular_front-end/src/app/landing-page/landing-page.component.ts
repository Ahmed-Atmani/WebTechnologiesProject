import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
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
