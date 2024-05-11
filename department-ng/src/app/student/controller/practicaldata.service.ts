import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from './../../common/constant';
import { Practical } from './practical';

@Injectable({
  providedIn: 'root'
})
export class PracticaldataService {
  
  getpracticaldata(userid:any):Observable<Practical>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    const form_data=new FormData();
    form_data.set('studentid',String(userid));
    return this.http.post<Practical>(baseurl+"/student/getpractical",form_data,{headers:headers})
  }
  addpracticaldata(userid:any,practicalid:any,file:File | undefined):Observable<responsepractical>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const form_data=new FormData();
    form_data.set('studentid',String(userid));    
    form_data.set('practicalid',String(practicalid));
    form_data.append("file",file as Blob,file?.name);
    return this.http.post<responsepractical>(baseurl+"/student/addpracticaldata",form_data,{headers:headers})
  }
  constructor(private http:HttpClient) { }
}
export interface responsepractical{
  status:number;
  message:string;
}