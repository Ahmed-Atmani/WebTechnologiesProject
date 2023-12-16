import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://127.0.0.1:8000/';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(AccountEmail: string, AccountPassword: string): Observable<any> {
    const body = { AccountEmail, AccountPassword };
    return this.http.post(`${this.baseUrl}/account/`, body);
  }

  storeToken(token: string): void {
    // Store the token in local storage
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    // Remove the token from local storage
    localStorage.removeItem(this.tokenKey);
  }

  // Add methods for handling token storage and retrieval
  // e.g., storeToken(token: string), getToken(): string, etc.

  logout(): Observable<any> {
    // Implement logout logic, e.g., remove token from storage
    return this.http.post(`${this.baseUrl}/logout/`, {});
  }
}
