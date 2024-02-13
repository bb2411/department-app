import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from './auth';
import { baseurl } from './constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(userid:number,password:string):Observable<Auth>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
      .set('userid', userid)
      .set('password', password);

    return this.http.post<Auth>(baseurl+"/auth/login", params, { headers: headers });
  }
  constructor(private http:HttpClient) { }
}
