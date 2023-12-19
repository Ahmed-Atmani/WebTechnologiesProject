import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:8000";
  readonly PhotoUrl = "http://localhost:8000/media/"

  accountid: string = '';

  updateAccountId(newAccountId: string): void {
    this.accountid = newAccountId;
  }

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

  getAccount(accountID: number): Observable<any[]> {

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

  addAccountToFollowing(follower: number, seller: number): Observable<any> {
    const data = {
      follower: follower,
      seller: seller,
    };
    return this.http.post(this.APIUrl + '/account/add_account_to_following/', data);
  }

  removeAccountFromFollowing(follower: number, seller: number): Observable<any> {
    const data = {
      follower: follower,
      seller: seller,
    };
    return this.http.post(this.APIUrl + '/account/remove_account_from_following/', data);
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  getAllAccountNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/account/');
  }

  getAccountName(accountID: number): Observable<any[]> {
    console.log('AccountId:'+ accountID);

    return this.http.get<any[]>(this.APIUrl + '/account/' + accountID + '/AccountFirstName/');
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

  updateItem(pk: string, val: any) {
    return this.http.put(this.APIUrl + '/item/'+ pk + '/', val);
  }

  deleteItem(val: any) {
    return this.http.delete(this.APIUrl + '/item/' + val + '/');
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
    return this.http.get<any[]>(this.APIUrl + '/item/?account=' + account);
  }

  getMyComplaintsList(account: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/complaint/?account=' + account);
  }

  addComplaint(val:any) {
console.log(val)
    return this.http.post(this.APIUrl + '/complaint/', val);
  }

  addReview(val:any) {
    console.log(val)
    return this.http.post(this.APIUrl + '/review/', val);
  }

  getAllImages(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/');
  }

  getImagesForItem(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/?item=' + id);
  }

  getImagesForCategory(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/?item-category=' + id);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item-category/');
  }

  getCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/item-category/' + category);
  }

  getReviewsForItem(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/review/?item=' + id);
  }

  updateSearchedKeyword(keyword: any) {
    console.log(keyword);
    this.searchedKeyword = keyword;
  }

  getMyPurchases(account: string) {
    return this.http.get<any[]>(this.APIUrl + '/purchase/?account=' + account);
  }

  getPurchaseState(purchaseId: number) {
    return this.http.get<string>(this.APIUrl + "/purchase/?purchaseid="+ purchaseId +"/state/");
  }

  getPurchaseDeliveryTime(purchaseID: number) {
    return this.http.get<number>(this.APIUrl + "/purchase/?purchaseid=" + purchaseID + "/delivery_time/");
  }

  getPurchaseDate(purchaseID: number) {
    return this.http.get<Date>(this.APIUrl + "/purchase/?purchaseid=" + purchaseID + "/purchase_date/");
  }

  addPurchase(itemIdList: number[], accountId: number, image: string) {
    const data: { Items: number[]; Account: number; CustomDrawing?: string } = {
      Items: itemIdList,
      Account: accountId,
    };
  
    if (image !== "") {
      data.CustomDrawing = image;
    }
  
    console.log(JSON.stringify(data, null, 4));  // Use console.log for debugging instead of alert
    return this.http.post(this.APIUrl + "/purchase/", data);
  }
  

  // getWishlistItems(account: string): Observable<any[]> {
  //   return this.http.get<any[]>(this.APIUrl + ' ' + account);
  // }

  searchMoviesByTitle(title: string): Observable<any>{
    var apiKey = "b152332e"; 
    var omdbApiUrl = "http://www.omdbapi.com/";
    const apiUrl = `${omdbApiUrl}?s=${title}&apikey=${apiKey}`;
    // return this.http.get<any>("/omdbapi/?s=" + title + "&apikey=b152332e");
    return this.http.jsonp(apiUrl, "callback");
  }

  getMovieDetailsById(imdbId: string): Observable<any> {
    var apiKey = "b152332e"; 
    var omdbApiUrl = "http://www.omdbapi.com/";
    const apiUrl = `${omdbApiUrl}?i=${imdbId}&apikey=${apiKey}`;
    return this.http.jsonp(apiUrl, "callback");
  }

}