import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/item/';

  constructor(private http: HttpClient) {}

  getBestsellers(): Observable<any[]> {
    // Adjust the URL based on your Django API endpoint
    const bestsellersUrl = `${this.apiUrl}?bestsellers=true`;
    return this.http.get<any[]>(bestsellersUrl);
  }
}
