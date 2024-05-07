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
    headers.append('Content-Type', 'application/form-data');
    const form_data=new FormData();
    form_data.set('userid',String(userid));
    form_data.set('password',password);
    const params = new HttpParams()
      .set('userid', userid)
      .set('password', password);

    return this.http.post<Auth>(baseurl+"/auth/login", form_data, { headers: headers });
  }
  constructor(private http:HttpClient) { }
}
