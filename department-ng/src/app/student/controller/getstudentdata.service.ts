import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Studentdata } from '../account/account.component';
import { baseurl } from './../../common/constant';
import { Attandance } from './attandance';

@Injectable({
  providedIn: 'root'
})
export class GetstudentdataService {

  getdata(userid:any):Observable<Attandance>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    const form_data=new FormData();
    form_data.set('studentid',String(userid));
    return this.http.post<Attandance>(baseurl+"/student/getattandancedata",form_data,{headers:headers});
  }
  getaccount(userid:any):Observable<Studentdata>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    const form_data=new FormData();
    form_data.set('studentid',String(userid));
    return this.http.post<Studentdata>(baseurl+"/student/getaccount",form_data,{headers:headers});
  }
  constructor(private http:HttpClient) { }
}
