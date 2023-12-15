import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { matchpassword } from './match.password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private service: SharedService, private router: Router) {
    this.getAllUser();
  }

  accountArray: any[]=[];
  registerForm: FormGroup = new FormGroup({

    AccountUserId: new FormControl('0'),
    AccountFirstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    AccountLastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    AccountPicture: new FormControl(''),
    AccountBirthDate: new FormControl('01-01-2023', [Validators.required]),
    AccountEmail: new FormControl('', [Validators.required, Validators.email]),
    AccountPassword: new FormControl('', [Validators.required, Validators.min(6)]),
    AccountPasswordConfirmation: new FormControl('', [Validators.required]),
    AccountAddressStreet: new FormControl('', [Validators.required]),
    AccountAddressCity: new FormControl('', [Validators.required]),
    AccountAddressCountry: new FormControl('', [Validators.required]),
    AccountAddressStreetNumber: new FormControl('0', [Validators.required]),
    AccountAddressPostalCode: new FormControl('0000', [Validators.required]),


  },
  {
    validators:matchpassword
  }
  )

  

  

  @Input() account:any;

  AccountUserId:number = 0;
  AccountFirstName:string = "";
  AccountLastName:string = "";
  AccountPicture:string = "empty-string";
  AccountBirthDate:Date = new Date("01-01-2023");
  AccountEmail:string = "";
  AccountPassword:string = "";
  AccountAddressStreet:string = "";
  AccountAddressCity:string = "";
  AccountAddressCountry:string = "";
  AccountAddressStreetNumber:number = 0;
  AccountAddressPostalCode:number = 0;

  ngOnInit(): void {    
  }

  getAllUser() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{
      this.accountArray = res;
  })
}

  onEdit(id: number) {
    this.http.get("https://jsonplaceholder.typicode.com/users"+ id).subscribe((res:any)=>{
      this.registerForm = new FormGroup({

        AccountUserId: new FormControl(res.AccountUserId),
        AccountFirstName: new FormControl(res.AccountFirstName),
        AccountLastName: new FormControl(res.AccountLastName),
        AccountPicture: new FormControl(res.AccountPicture),
        AccountBirthDate: new FormControl(res.AccountBirthDate),
        AccountEmail: new FormControl(res.AccountEmail),
        AccountPassword: new FormControl(res.AccountPassword),
        AccountPasswordConfirmation: new FormControl(res.AccountPasswordConfirmation),
        AccountAddressStreet: new FormControl(res.AccountAddressStreet),
        AccountAddressCity: new FormControl(res.AccountAddressCity),
        AccountAddressCountry: new FormControl(res.AccountAddressCountry),
        AccountAddressStreetNumber: new FormControl(res.AccountAddressStreetNumber),
        AccountAddressPostalCode: new FormControl(res.AccountAddressPostalCode),
    
    
      })
    })
  }

  addAccount(){
    var val = {
      AccountFirstName: this.AccountFirstName,
      AccountLastName: this.AccountLastName,
      AccountPicture: this.AccountPicture,
      AccountBirthDate: this.AccountBirthDate,
      AccountEmail: this.AccountEmail,
      AccountPassword: this.AccountPassword,
      AccountAddressStreet: this.AccountAddressStreet,
      AccountAddressCity: this.AccountAddressCity,
      AccountAddressCountry: this.AccountAddressCountry,
      AccountAddressStreetNumber: this.AccountAddressStreetNumber,
      AccountAddressPostalCode: this.AccountAddressPostalCode,
    }

    this.service.addAccount(val).subscribe(res => {
    alert(res.toString());
    })
    this.router.navigate(['/login']);
   
    // }
    
  
    // })

  }
}