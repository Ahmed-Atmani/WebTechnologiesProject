import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:8000";
  readonly PhotoUrl = "http://localhost:8000/media/"

  searchedKeyword: any;

  constructor(private http: HttpClient) { }

  // == ACCOUNT ==
  getAccountList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/account/');
  }

  getLoggedInAccount(accountID: number): Observable<any[]> {
    console.log(this.http.get<any[]>(this.APIUrl + '/account/' + accountID));
    
    return this.http.get<any[]>(this.APIUrl + '/account/' + accountID);
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
  
  getCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item-category/');
  }

  getItemsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item/?item-category=' + categoryId);
  }

  getMyItems(account: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item/?itemseller=' + account);
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

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item-category/');
  }

  getReviewsForItem(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/review/?item=' + id);
  }

  updateSearchedKeyword(keyword: any) {
    console.log(keyword);
    this.searchedKeyword = keyword;
  }

  // getWishlistItems(account: string): Observable<any[]> {
  //   return this.http.get<any[]>(this.APIUrl + ' ' + account);
  // }

}

