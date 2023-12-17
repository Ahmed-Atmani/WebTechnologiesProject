import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://127.0.0.1:8000/';
  private tokenKey = 'auth_token';
  private AccountId: string = 'user_id';

  constructor(private http: HttpClient) {}

  login(AccountEmail: string, AccountPassword: string): Observable<any> {
    const body = { AccountEmail, AccountPassword };
    return this.http.post(`${this.baseUrl}login/`, body);
  }

  storeTokenUser(token: string, user: string): void {
    // Store the token in local storage
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.AccountId, user);
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    let token = localStorage.getItem(this.tokenKey)
    if (token)
     return token
    else
      return 'no-token'
  }

  getAccountId(): string {
    // Retrieve the user id from local storage
    let id = localStorage.getItem(this.AccountId)
    if (id)
     return id
    else
      return 'no-id'
  }

  removeTokenUser(): void {
    // Remove the token from local storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.AccountId);
  }

  logout(): Observable<any> {
    // Implement logout logic, e.g., remove token from storage
    return this.http.post(`${this.baseUrl}logout/`, {});
  }
}
