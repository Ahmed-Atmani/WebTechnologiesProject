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

  constructor(private http: HttpClient, public shared: SharedService, private loginservice: LoginService, private router: Router) {}




  login(): void {
    const AccountEmail = this.loginForm.get('AccountEmail')!.value;
    const AccountPassword = this.loginForm.get('AccountPassword')!.value;

    this.loginservice.login(AccountEmail, AccountPassword).subscribe(
      (response) => {
        // Handle successful login, store token, etc.
        console.log('Login successful');
        console.log(response);
        const token = response.token;
        const AccountId = response.AccountId;
        console.log('Token:', token);

        this.loginservice.storeTokenUser(token, AccountId);
        this.router.navigate(['/'])

      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        alert('Your e-mail or password was not correct. Please try again. ');
      }
    );
  }

  logout() {
    this.loginservice.logout().subscribe(
      () => {
        // Handle successful logout, e.g., remove token from storage
        console.log('Logout successful');
        this.loginservice.removeTokenUser();
      },
      (error) => {
        // Handle logout error
        console.error('Logout failed', error);
      }
    );
  }


}
