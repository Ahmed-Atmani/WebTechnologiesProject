import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:8000";
  readonly PhotoUrl = "http://localhost:8000/media/"

  constructor(private http: HttpClient) { }

  // == ACCOUNT ==
  getAccountList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/account/');
  }

  addAccount(val: any) {
    return this.http.post(this.APIUrl + '/account/', val);
  }

  updateAccount(pk: string, val: any) {
    return this.http.put(this.APIUrl + '/account/' + pk + '/', val);
  }

  deleteAccount(val: any) {
    return this.http.delete(this.APIUrl + '/account/' + val + '/');
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  getAllAccountNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/account/');
  }

  registerAccount(val: any) {
    return this.http.post(this.APIUrl + '/account/', val);
  }
  // Add all other API's for remaining models

  getItemList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item/');
  }

  // == ITEM ==
  addItem(val: any) {
    return this.http.post(this.APIUrl + '/item/', val);
  }

  updateItem(val: any) {
    return this.http.put(this.APIUrl + '/item/', val);
  }

  deleteItem(val: any) {
    return this.http.delete(this.APIUrl + '/item/' + val);
  }

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item/');
  }

  getItem(id: any): Observable<any> {
    console.log(this.APIUrl + '/item/' + id);
    return this.http.get<any>(this.APIUrl + '/item/' + id);
  }

  regiserItem(val: any) {
    return this.http.post(this.APIUrl + '/item/', val);
  }

  getMyComplaintsList(account: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/complaint/?account=' + account);
  }

  addComplaint(val:any) {
    console.log(val)
    return this.http.post(this.APIUrl + '/complaint/', val);
  }

  getAllImages(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/');
  }

  getImagesForItem(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/?item=' + id);
  }
}

