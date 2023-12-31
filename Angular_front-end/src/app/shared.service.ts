import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { enc, MD5 } from 'crypto-js';


/*
  This is the main service used to fetch data from the back-end and the movie API's 
*/

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

  isAdminAccount(accountID: number): Observable<any[]> {
    const data = {
      account: accountID,
    };
    return this.http.put<any[]>(this.APIUrl + '/account/is_superuser/', data);
  }

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
    // console.log(this.APIUrl + '/item/' + id);
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
// console.log(val)
    return this.http.post(this.APIUrl + '/complaint/', val);
  }

  addReview(val:any) {
    // console.log(val)
    return this.http.post(this.APIUrl + '/review/', val);
  }

  getAllImages(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/');
  }

  getImagesForItem(id: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/image/?item=' + id);
  }

  addImageForItem(id: any, val: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/image/?item=' + id, val);
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

  addPurchase(itemIdList: number[], accountId: number, address: any, image: string) {
    const data: { Items: number[];
                  Account: number;
                  CustomDrawing?: string;
                  PurchaseStreet?: string;
                  PurchaseStreetNumber?: number;
                  PurchaseCity: string;
                  PurchasePostalCode: number;
                  PurchaseCountry: string;} = {
      Items: itemIdList,
      Account: accountId,
      PurchaseCity: address.PurchaseCity,
      PurchaseCountry: address.PurchaseCountry,
      PurchasePostalCode: parseInt(address.PurchasePostalCode)
    };

    if (address.PurchaseStreetNumber != null) {
      data.PurchaseStreetNumber = address.PurchaseStreetNumber;
    }

    if (address.PurchaseStreet != null && address.PurchaseStreet != "") {
      data.PurchaseStreet = address.PurchaseStreet;
    }


    if (image !== "") {
      data.CustomDrawing = image;
    }

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

    // Based on code written by ChatGPT
  }

  getMovieDetailsById(imdbId: string): Observable<any> {
    var apiKey = "b152332e";
    var omdbApiUrl = "http://www.omdbapi.com/";
    const apiUrl = `${omdbApiUrl}?i=${imdbId}&apikey=${apiKey}`;
    return this.http.jsonp(apiUrl, "callback");

    // Based on code written by ChatGPT
  }

  getMovieDetailsByIdFromTMDB(imdbId: string): Observable<any> {
    const tmdbApiUrl = 'https://api.themoviedb.org/3';
    const tmdbApiKey = '9714963b09385c0e5483009be75ac2af';
    const endpoint = `/movie/${imdbId}`;
    const apiKeyParam = `api_key=${tmdbApiKey}`;
    const apiUrl = `${tmdbApiUrl}${endpoint}?${apiKeyParam}`;

    return this.http.get<any>(apiUrl);

    // Based on code written by ChatGPT
  }

  generateMoviePrice(movieTitle: string): number {
    // Use a hash function to create a deterministic mapping (title->price)
    // (deterministic = the same movie will always get the same price)
    const hash = MD5(movieTitle).toString(enc.Hex);

    // Hash->[5, 30]
    const price = parseInt(hash, 16) % (30 - 5 + 1) + 5;

    const roundedPrice = Math.round(price * 100) / 100;
    return roundedPrice;
  }

  getMovieByImdbId(id: string) {
    return this.http.get<any[]>(this.APIUrl + '/item/?brand=' + id);
  }

  getItemIdByImdbId(imdbId: string): number {
    this.getMovieByImdbId(imdbId).subscribe(
      (item: any) => {
        return item.ItemId as number;
      },
      (error) => {
        return -1;
      }
    );
    return -1;
  }
}
