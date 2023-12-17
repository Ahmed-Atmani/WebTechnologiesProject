import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-new-bestsellers',
  templateUrl: './new-bestsellers.component.html',
  styleUrls: ['./new-bestsellers.component.css']
})
export class NewBestsellersComponent implements OnInit {

  bestsellers: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getBestsellers().subscribe((data: any) => {
      this.bestsellers = data;
    });
  }
}
