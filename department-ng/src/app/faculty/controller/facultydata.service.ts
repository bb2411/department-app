import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../common/constant';
import { Facultydata } from '../account/account.component';

@Injectable({
  providedIn: 'root'
})
export class FacultydataService {
  static userid:any;
  static subject:any=[];
  static batch:any=[];
  getsubject(){
    return FacultydataService.subject;
  }
  getuserid(){
    return FacultydataService.userid;
  }
  getbatch(){
    return FacultydataService.batch;
  }
  getdataapi(facid:any):Observable<res>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("facid", facid);
    let response=this.api.post<res>(baseurl+"/faculty/getdata",formData,{headers:headers});
    response.subscribe((res:res)=>{
      if(res.status==200){
        FacultydataService.subject=res.subjects;
        FacultydataService.batch=res.batches;
      }
    })
    return response;
  }


  getaccount(userid:any):Observable<Facultydata>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    const form_data=new FormData();
    form_data.set('facultyid',String(userid));
    return this.api.post<Facultydata>(baseurl+"/faculty/getaccount",form_data,{headers:headers});
  }
  constructor(private api:HttpClient) { }
}
export interface res{
  status:any;
  batches:any;
  subjects:any;
}
