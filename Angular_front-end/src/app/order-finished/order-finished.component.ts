import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-finished',
  templateUrl: './order-finished.component.html',
  styleUrls: ['./order-finished.component.css']
})
export class OrderFinishedComponent implements OnInit{

  ngOnInit(): void {
    this.ClearCart();
  }

  ClearCart(): void {
    localStorage.clear();

  }

}
