import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AuthService } from 'src/app/auth.service';

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

  loginForm: FormGroup = new FormGroup({

    AccountEmail: new FormControl('', [Validators.required, Validators.email]),
    AccountPassword: new FormControl('', [Validators.required]),
  })

  AccountEmail: string = '';
  AccountPassword: string = '';
  errorMessage: string = '';
  loginInProgress: boolean = false;

  constructor(private http: HttpClient, public shared: SharedService, private authService: AuthService, private router: Router) {}


  

  login(): void {
    this.loginInProgress = true;
    this.authService.login(this.AccountEmail, this.AccountPassword).subscribe(
      (response) => {
        if (response.success) {
          // Navigate to the desired page upon successful login
          console.log('Login successful!');
          this.router.navigate(['/account-overview']);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        this.errorMessage = 'An unexpected error occurred.';
      }
    ).add(() => {
      this.loginInProgress = false;
    });
  }

  
}
