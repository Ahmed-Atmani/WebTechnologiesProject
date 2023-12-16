import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { LoginService } from 'src/app/login.service';

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

  constructor(private http: HttpClient, public shared: SharedService, private loginservice: LoginService, private router: Router) {}




  login(): void {
    const AccountEmail = this.loginForm.get('AccountEmail')!.value;
    const AccountPassword = this.loginForm.get('AccountPassword')!.value;

    this.loginservice.login(AccountEmail, AccountPassword).subscribe(
      (response) => {
        // Handle successful login, store token, etc.
        console.log('Login successful');
        const token = response.token;
        console.log('API Response:', response);
        
        console.log('Token:', token);
        
        this.loginservice.storeToken(token);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
  //   this.loginInProgress = true;
  //   this.authService.login(this.AccountEmail, this.AccountPassword).subscribe(
  //     (response) => {
  //       if (response.success) {
  //         // Navigate to the desired page upon successful login
  //         console.log('Login successful!');
  //         const token = 'your_received_token';
  //         this.authService.setToken(token);
  //         console.log(token);
  //         this.router.navigate(['/account-overview']);
  //       } else {
  //         this.errorMessage = response.message;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error occurred:', error);
  //       this.errorMessage = 'An unexpected error occurred.';
  //     }
  //   ).add(() => {
  //     this.loginInProgress = false;
  //   });
  // }

  logout() {
    this.loginservice.logout().subscribe(
      () => {
        // Handle successful logout, e.g., remove token from storage
        console.log('Logout successful');
        this.loginservice.removeToken();
      },
      (error) => {
        // Handle logout error
        console.error('Logout failed', error);
      }
    );
  }


}
