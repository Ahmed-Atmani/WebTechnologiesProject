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
        console.log('Login successful');
        console.log(response);
        const token = response.token;
        const AccountId = response.AccountId;
        this.shared.updateAccountId(token);
        console.log('Token:', token);

        this.loginservice.storeTokenUser(token, AccountId);
        this.router.navigate(['/'])

      },
      (error) => {
        console.error('Login failed', error);
        alert('Your e-mail or password was not correct. Please try again. ');
      }
    );
  }

  logout() {
    this.loginservice.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.loginservice.removeTokenUser();
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }


}
