import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import {LoginService} from "../login.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private is_admin: any[] = [];
  constructor(private router: Router, private service : SharedService, private loginservice: LoginService) {}

  openDjangoAdmin() {
    // Update the URL based on your Django admin URL
    const djangoAdminUrl = 'http://localhost:8000/admin/';
    this.service.isAdminAccount(Number(this.loginservice.getAccountId())).subscribe((data => {
            this.is_admin = data
      console.log(this.is_admin)
          }))
    // Navigate to Django admin within the same tab
    window.open(djangoAdminUrl, '_blank');
  }

}
