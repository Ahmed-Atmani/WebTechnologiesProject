import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    readonly APIUrl = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  login(AccountEmail: string, AccountPassword: string): Observable<any> {
    const url = this.APIUrl + '/api/account/';
    const body = { AccountEmail, AccountPassword };

    return this.http.post<any>(url, body);
  }
}
