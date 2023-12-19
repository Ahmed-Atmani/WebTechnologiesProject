import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router) {}

  openDjangoAdmin() {
    // Update the URL based on your Django admin URL
    const djangoAdminUrl = 'http://localhost:8000/admin/';

    // Navigate to Django admin within the same tab
    window.open(djangoAdminUrl, '_blank');
  }
}
