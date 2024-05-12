import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../common/constant';
import { Practicalresponse } from './practicalrecord';

@Injectable({
  providedIn: 'root'
})
export class GetpracticaldataService {

  getpracticals(facid:any,subject:any,batch:any,division:any):Observable<Practicalresponse>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("batch",batch);
    formData.append("subject",subject);
    formData.append("division",division);
    formData.append("faculty_id",facid);
    return this.http.post<Practicalresponse>(baseurl+"/faculty/getpracticaldata",formData,{headers:headers});
  }


  constructor(private http:HttpClient) { }
}
