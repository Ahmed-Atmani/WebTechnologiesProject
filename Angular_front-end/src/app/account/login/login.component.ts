import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    // TODO: ADD USER INFO TO LOCALSTORAGE
    // localStorage.setItem("AccountId", this.AccountId);
    // localStorage.setItem("ItemList", <SET '[]' or saved shopping cart from DB>);
    
  }
}
