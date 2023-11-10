import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://localhost:8000";
readonly PhotoUrl = "http://localhost:8000/media/"

  constructor(private http:HttpClient) { }

  getAccountList():Observable<any[]>{
    console.log('===================');
    console.log(this.APIUrl + '/account/');
    let x: Observable<any[]> = this.http.get<any[]>(this.APIUrl + '/account/');
    console.log(x);
    
    return x;
  }

  addAccount(val:any){
    return this.http.post(this.APIUrl + '/account/', val);
  }
  
  updateAccount(val:any){
    return this.http.put(this.APIUrl + '/account/', val);
  }
  
  deleteAccount(val:any){
    return this.http.delete(this.APIUrl + '/account/', val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  getAllAccountNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/account/');
  }

  // Add all other API's for remaining models 

}

